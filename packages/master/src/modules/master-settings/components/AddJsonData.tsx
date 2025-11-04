'use client'

import { SaveIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import DownloadJSONButton from '../../../components/buttons/DownloadJSONButton'
import ImportJSONButton from '../../../components/buttons/ImportJSONButton'
import Modal from '../../../components/DragResizeModal'
import { Button } from '../../../components/ui/button'
import { useToast } from '../../../components/ui/use-toast'
import { API_URLS } from '../../../lib/constants/url'
import { useSubscribeBulkCommandStatus } from '../../../lib/hook/useSubscribeMessage'
import { removeSortKeyVersion } from '../../../lib/utils/removeSortKeyVersion'
import { useHttpClient } from '../../../provider'
import { DataSettingDataEntity, SettingDataEntity } from '../../../types'
import {
  isValidMasterDataJson,
  isValidSettingJson,
  sampleMixedJson,
  sampleSettingJson,
} from '../schema'
import JSONEditorComponent from '../../../components/JSONEditorComponent'

// Mapping types for developer-provided mapper
export type MappedSetting = {
  kind: 'setting'
  value: {
    name: string
    code: string
    tenantCode?: string
    settingValue: Record<string, any>
  }
}
export type MappedData = {
  kind: 'data'
  value: {
    settingCode: string
    code: string
    name: string
    seq: number
    attributes: Record<string, any>
    tenantCode?: string
  }
}
export type MapResult = MappedSetting | MappedData

// Detection functions to identify item types
function isMasterSettingsItem(item: any): boolean {
  return (
    typeof item === 'object' &&
    item !== null &&
    'code' in item &&
    'name' in item &&
    'attributes' in item &&
    typeof item.attributes === 'object' &&
    item.attributes !== null &&
    Array.isArray(item.attributes.fields)
  )
}

function isMasterDataItem(item: any): boolean {
  return (
    typeof item === 'object' &&
    item !== null &&
    'settingCode' in item &&
    'code' in item &&
    'name' in item &&
    'attributes' in item &&
    'seq' in item &&
    typeof item.seq === 'number'
  )
}

// Split data array into Settings, Data, and Invalid items
function splitDataByType(data: any[]): {
  settings: any[]
  data: any[]
  invalid: any[]
} {
  const settings: any[] = []
  const dataItems: any[] = []
  const invalid: any[] = []

  for (const item of data) {
    const isSettings = isMasterSettingsItem(item)
    const isData = isMasterDataItem(item)

    // Prioritize Data over Settings if both match
    if (isData) {
      dataItems.push(item)
    } else if (isSettings) {
      settings.push(item)
    } else {
      invalid.push(item)
    }
  }

  return { settings, data: dataItems, invalid }
}

function ModalContent({
  open,
  value,
  setOpen,
  setValue,
  saveData,
  onCloseModal,
  submitting,
  relaxedSchema,
}: {
  open: boolean
  value: string
  submitting: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  setValue: Dispatch<SetStateAction<string>>
  saveData: () => void
  onCloseModal?: () => void
  relaxedSchema?: boolean
}) {
  useEffect(() => {
    if (!submitting && !open) {
      onCloseModal?.()
      setOpen(false)
    }
  }, [submitting, open])
  return (
    <div className="flex w-full flex-col overflow-hidden">
      <div className="mb-3 mt-5 flex-1">
        <JSONEditorComponent
          text={value}
          onChangeText={(json) => setValue(json)}
          schema={
            relaxedSchema
              ? { type: 'array', items: { type: 'object' } }
              : {
                  type: 'array',
                  items: {
                    oneOf: [
                      {
                        type: 'object',
                        properties: {
                          code: { type: 'string' },
                          name: { type: 'string' },
                          attributes: {
                            $ref: '#/definitions/settingsAttributes',
                          },
                        },
                        required: ['code', 'name', 'attributes'],
                      },
                      {
                        type: 'object',
                        properties: {
                          settingCode: { type: 'string' },
                          code: { type: 'string' },
                          name: { type: 'string' },
                          seq: { type: 'number' },
                          attributes: { type: 'object' },
                        },
                        required: [
                          'settingCode',
                          'code',
                          'name',
                          'seq',
                          'attributes',
                        ],
                      },
                    ],
                  },
                  definitions: {
                    settingsAttributes: {
                      type: 'object',
                      properties: {
                        description: { type: 'string' },
                        fields: {
                          type: 'array',
                          items: { $ref: '#/definitions/fields' },
                        },
                      },
                      required: ['fields'],
                    },
                    fields: {
                      type: 'object',
                      properties: {
                        physicalName: { type: 'string' },
                        name: { type: 'string' },
                        description: { type: 'string' },
                        dataType: {
                          enum: ['string', 'number', 'json', 'date'],
                        },
                        min: { type: 'string' },
                        max: { type: 'string' },
                        length: { type: 'string' },
                        maxRow: { type: 'number' },
                        defaultValue: { type: 'string' },
                        isRequired: { type: 'boolean' },
                        isShowedOnList: { type: 'boolean' },
                        dataFormat: { type: 'string' },
                      },
                      required: [
                        'physicalName',
                        'name',
                        'dataType',
                        'isRequired',
                        'isShowedOnList',
                      ],
                    },
                  },
                }
          }
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="secondary"
          disabled={submitting}
          onClick={() => {
            onCloseModal?.()
            setOpen(false)
          }}
        >
          キャンセル
        </Button>
        <ImportJSONButton disabled={submitting} onAdd={setValue} />
        <DownloadJSONButton
          disabled={submitting}
          fileName="master-setting-bulk.json"
          data={value}
        />
        <Button type="button" loading={submitting} onClick={saveData}>
          <SaveIcon size={16} />
          データ反映
        </Button>
      </div>
    </div>
  )
}

function TriggerButton({
  disabled,
  setOpen,
  onClick,
}: {
  disabled: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  onClick?: () => void
}) {
  const handleClick = () => {
    setOpen(true)
    onClick?.()
  }
  return (
    <Button
      type="button"
      variant="outline"
      className="block"
      disabled={disabled}
      onClick={handleClick}
    >
      JSONエディタ
    </Button>
  )
}

export default function AddJsonData({
  tenantCode,
  jsonValue,
  inputSampleJson,
  mapRawItem,
  onSave,
}: {
  tenantCode: string
  jsonValue?: string
  inputSampleJson?: string
  mapRawItem?: (raw: unknown) => MapResult | null | undefined
  onSave?: (result: {
    settings?: SettingDataEntity[]
    data?: DataSettingDataEntity[]
  }) => void
}) {
  const router = useRouter()
  const { toast } = useToast()
  const [value, setValue] = useState<string>('')
  const [submitting, setSubmitting] = useState(false)
  const [open, setOpen] = useState(false)
  const [savedSettingsData, setSavedSettingsData] = useState<
    SettingDataEntity[]
  >([])
  const [savedDataData, setSavedDataData] = useState<DataSettingDataEntity[]>(
    []
  )
  const [settingsExpectedCount, setSettingsExpectedCount] = useState(0)
  const [dataExpectedCount, setDataExpectedCount] = useState(0)
  const httpClient = useHttpClient()
  const [settingsTenant, setSettingsTenant] = useState<string>(tenantCode)
  const [dataTenant, setDataTenant] = useState<string>(tenantCode)

  const {
    start: startSettings,
    stop: stopSettings,
    finishedCount: settingsFinishedCount,
  } = useSubscribeBulkCommandStatus(settingsTenant, () => {
    // Timeout callback for Settings
    setSubmitting(false)
    setOpen(false)
    setSettingsExpectedCount(0)
    toast({
      title: 'マスター設定の登録に失敗しました。',
      description:
        'タイムアウトしました。入力内容を確認した上で再度やり直してください。',
      variant: 'destructive',
    })
    router.refresh()
  })

  const {
    start: startData,
    stop: stopData,
    finishedCount: dataFinishedCount,
  } = useSubscribeBulkCommandStatus(dataTenant, () => {
    // Timeout callback for Data
    setSubmitting(false)
    setOpen(false)
    setDataExpectedCount(0)
    toast({
      title: 'マスターデータの登録に失敗しました。',
      description:
        'タイムアウトしました。入力内容を確認した上で再度やり直してください。',
      variant: 'destructive',
    })
    router.refresh()
  })

  // Track when all items are finished - Settings
  useEffect(() => {
    if (settingsFinishedCount === 0 || settingsExpectedCount === 0) return

    // Show toast for each completed item
    toast({
      description: `マスター設定を登録しました (${settingsFinishedCount}/${settingsExpectedCount})`,
      variant: 'success',
    })

    // Check if all items are finished
    if (settingsFinishedCount >= settingsExpectedCount) {
      stopSettings()
      setSettingsExpectedCount(0)
    }
  }, [settingsFinishedCount, settingsExpectedCount, toast, stopSettings])

  // Track when all items are finished - Data
  useEffect(() => {
    if (dataFinishedCount === 0 || dataExpectedCount === 0) return

    // Show toast for each completed item
    toast({
      description: `マスターデータを登録しました (${dataFinishedCount}/${dataExpectedCount})`,
      variant: 'success',
    })

    // Check if all items are finished
    if (dataFinishedCount >= dataExpectedCount) {
      stopData()
      setDataExpectedCount(0)
    }
  }, [dataFinishedCount, dataExpectedCount, toast, stopData])

  // Check if both operations complete
  useEffect(() => {
    const bothComplete =
      (settingsExpectedCount === 0 ||
        settingsFinishedCount >= settingsExpectedCount) &&
      (dataExpectedCount === 0 || dataFinishedCount >= dataExpectedCount)

    if (bothComplete && (settingsExpectedCount > 0 || dataExpectedCount > 0)) {
      setSubmitting(false)
      setOpen(false)
      setSettingsExpectedCount(0)
      setDataExpectedCount(0)

      // Call onSave to refresh data
      onSave?.({
        settings: savedSettingsData.length > 0 ? savedSettingsData : undefined,
        data: savedDataData.length > 0 ? savedDataData : undefined,
      })
    }
  }, [
    settingsFinishedCount,
    settingsExpectedCount,
    dataFinishedCount,
    dataExpectedCount,
    savedSettingsData,
    savedDataData,
    onSave,
  ])

  const saveData = async () => {
    let parsedData: any
    try {
      parsedData = JSON.parse(value)
    } catch (error) {
      toast({
        title: 'JSON が無効です',
        description: '正しいJSONフォーマットである必要があります。',
        variant: 'destructive',
      })
      return
    }

    if (!Array.isArray(parsedData)) {
      toast({
        title: 'JSON が無効です',
        description: '配列である必要があります。',
        variant: 'destructive',
      })
      return
    }

    // If mapper provided, transform first
    if (mapRawItem) {
      const mapped = parsedData
        .map((item: any) => mapRawItem(item))
        .filter(Boolean) as MapResult[]

      const mappedSettings = mapped
        .filter((m) => m.kind === 'setting')
        .map((m) => (m as MappedSetting).value)
      const mappedData = mapped
        .filter((m) => m.kind === 'data')
        .map((m) => (m as MappedData).value)

      if (mappedSettings.length === 0 && mappedData.length === 0) {
        toast({ title: 'データがありません', variant: 'destructive' })
        return
      }

      // Basic validation for mapped settings
      const invalidSettings = mappedSettings.filter(
        (x) =>
          !x ||
          typeof x.name !== 'string' ||
          typeof x.code !== 'string' ||
          typeof x.settingValue !== 'object'
      )
      if (invalidSettings.length > 0) {
        toast({
          title: 'マッピング結果が無効です',
          description:
            '設定データの name, code は文字列、settingValue はオブジェクトである必要があります。',
          variant: 'destructive',
        })
        return
      }

      // Basic validation for mapped data
      const invalidData = mappedData.filter(
        (x) =>
          !x ||
          typeof x.settingCode !== 'string' ||
          typeof x.code !== 'string' ||
          typeof x.name !== 'string' ||
          typeof x.seq !== 'number' ||
          typeof x.attributes !== 'object'
      )
      if (invalidData.length > 0) {
        toast({
          title: 'マッピング結果が無効です',
          description:
            'データの settingCode, code, name は文字列、seq は数値、attributes はオブジェクトである必要があります。',
          variant: 'destructive',
        })
        return
      }

      setSubmitting(true)

      // Process mapped settings
      if (mappedSettings.length > 0) {
        try {
          const res = (
            await httpClient.post<SettingDataEntity[]>(
              API_URLS.SETTING.CREATE_BULK,
              {
                items: mappedSettings,
              }
            )
          ).data

          if (!res?.[0]?.requestId) {
            toast({
              title: 'マスター設定の登録に失敗しました。',
              description: '入力内容を確認した上で再度やり直してください。',
              variant: 'destructive',
            })
            setSubmitting(false)
            return
          }
          // Switch listening tenant to mapped tenant if provided
          const mappedTenant = mappedSettings[0]?.tenantCode || tenantCode
          setSettingsTenant(mappedTenant)
          setSettingsExpectedCount(res.length)
          startSettings(res[0].requestId)
          setSavedSettingsData(
            res.map((item) => ({
              ...item,
              sk: removeSortKeyVersion(item.sk),
            }))
          )
        } catch (error) {
          console.error(error)
          toast({
            title: 'マスター設定の登録に失敗しました。',
            description: 'サーバーエラーが発生しました。',
            variant: 'destructive',
          })
          setSubmitting(false)
          return
        }
      }

      // Process mapped data
      if (mappedData.length > 0) {
        try {
          const res = (
            await httpClient.post<DataSettingDataEntity[]>(
              API_URLS.DATA.CREATE_BULK,
              {
                items: mappedData,
              }
            )
          ).data

          if (!res?.[0]?.requestId) {
            toast({
              title: 'マスターデータの登録に失敗しました。',
              description: '入力内容を確認した上で再度やり直してください。',
              variant: 'destructive',
            })
            setSubmitting(false)
            return
          }
          // Switch listening tenant to mapped tenant if provided
          const mappedTenant = mappedData[0]?.tenantCode || tenantCode
          setDataTenant(mappedTenant)
          setDataExpectedCount(res.length)
          startData(res[0].requestId)
          setSavedDataData(
            res.map((item) => ({
              ...item,
              sk: removeSortKeyVersion(item.sk),
            }))
          )
        } catch (error) {
          console.error(error)
          toast({
            title: 'マスターデータの登録に失敗しました。',
            description: 'サーバーエラーが発生しました。',
            variant: 'destructive',
          })
          setSubmitting(false)
          return
        }
      }

      return
    }

    // Split data by type
    const { settings, data: dataItems, invalid } = splitDataByType(parsedData)

    if (invalid.length > 0) {
      toast({
        title: 'JSON が無効です',
        description: `${invalid.length}個の項目が認識できませんでした。`,
        variant: 'destructive',
      })
      return
    }

    if (settings.length === 0 && dataItems.length === 0) {
      toast({ title: 'データがありません', variant: 'destructive' })
      return
    }

    setSubmitting(true)

    // Process Settings if present
    if (settings.length > 0) {
      if (!isValidSettingJson(settings)) {
        toast({
          title: 'マスター設定のJSONが無効です',
          variant: 'destructive',
        })
        setSubmitting(false)
        return
      }

      try {
        const res = (
          await httpClient.post<SettingDataEntity[]>(
            API_URLS.SETTING.CREATE_BULK,
            {
              items: settings.map((item) => ({
                ...item,
                settingValue: {
                  ...item.attributes,
                },
              })),
            }
          )
        ).data

        if (!res?.[0].requestId) {
          toast({
            title: 'マスター設定の登録に失敗しました。',
            description: '入力内容を確認した上で再度やり直してください。',
            variant: 'destructive',
          })
          setSubmitting(false)
          return
        } else {
          setSettingsExpectedCount(res.length)
          startSettings(res[0].requestId)
          setSavedSettingsData(
            res.map((item) => ({
              ...item,
              sk: removeSortKeyVersion(item.sk),
            }))
          )
        }
      } catch (error) {
        console.error(error)
        toast({
          title: 'マスター設定の登録に失敗しました。',
          description: 'サーバーエラーが発生しました。',
          variant: 'destructive',
        })
        setSubmitting(false)
        return
      }
    }

    // Process Data if present
    if (dataItems.length > 0) {
      if (!isValidMasterDataJson(dataItems)) {
        toast({
          title: 'マスターデータのJSONが無効です',
          variant: 'destructive',
        })
        setSubmitting(false)
        return
      }

      try {
        const res = (
          await httpClient.post<DataSettingDataEntity[]>(
            API_URLS.DATA.CREATE_BULK,
            {
              items: dataItems,
            }
          )
        ).data

        if (!res?.[0].requestId) {
          toast({
            title: 'マスターデータの登録に失敗しました。',
            description: '入力内容を確認した上で再度やり直してください。',
            variant: 'destructive',
          })
          setSubmitting(false)
          return
        } else {
          setDataExpectedCount(res.length)
          startData(res[0].requestId)
          setSavedDataData(
            res.map((item) => ({
              ...item,
              sk: removeSortKeyVersion(item.sk),
            }))
          )
        }
      } catch (error) {
        console.error(error)
        toast({
          title: 'マスターデータの登録に失敗しました。',
          description: 'サーバーエラーが発生しました。',
          variant: 'destructive',
        })
        setSubmitting(false)
        return
      }
    }
  }

  useEffect(() => {
    setValue(jsonValue || inputSampleJson || sampleMixedJson)
  }, [jsonValue, inputSampleJson])

  return (
    <Modal>
      <Modal.Open opens="add-json-setting">
        <TriggerButton disabled={submitting} setOpen={setOpen} />
      </Modal.Open>
      <Modal.Window name="add-json-setting">
        <ModalContent
          submitting={submitting}
          open={open}
          value={value}
          setOpen={setOpen}
          saveData={saveData}
          setValue={setValue}
          relaxedSchema={Boolean(mapRawItem)}
        />
      </Modal.Window>
    </Modal>
  )
}
