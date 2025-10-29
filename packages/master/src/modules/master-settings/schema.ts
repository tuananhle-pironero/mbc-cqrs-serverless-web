export const sampleSettingJson = JSON.stringify([
  {
    code: '',
    name: '',
    attributes: {
      description: '',
      fields: [
        {
          physicalName: 'code',
          name: 'コード',
          description: '',
          dataType: 'string',
          defaultValue: '',
          isRequired: true,
          isShowedOnList: true,
          length: '255',
          uiComponent: 'string',
        },
        {
          physicalName: 'name',
          name: '名称',
          description: '',
          dataType: 'string',
          isRequired: true,
          isShowedOnList: true,
          length: '255',
          uiComponent: 'string',
        },
        {
          physicalName: 'seq',
          name: '並び順',
          description: '',
          dataType: 'number',
          defaultValue: '',
          isRequired: false,
          isShowedOnList: true,
          uiComponent: 'string',
        },
      ],
    },
  },
])

const isObject = (data: any) => {
  return typeof data === 'object' && !Array.isArray(data) && data !== null
}
const isArray = (data: any) => {
  return typeof data === 'object' && Array.isArray(data) && data !== null
}

export const isValidSettingJson = (data: any) => {
  if (!isArray(data)) {
    return false
  }
  for (const item of data) {
    if (!isObject(item)) {
      return false
    }
    if (!('code' in item) || !('name' in item) || !('attributes' in item)) {
      return false
    }
    if (!isObject(item.attributes)) {
      return false
    }
    const attrs = item.attributes
    if (!attrs?.fields || !isArray(attrs.fields)) {
      return false
    }
    for (const field of attrs.fields) {
      if (
        !('physicalName' in field) ||
        !('name' in field) ||
        !('dataType' in field) ||
        typeof field?.isRequired !== 'boolean' ||
        typeof field?.isShowedOnList !== 'boolean'
      ) {
        return false
      }
    }
  }
  return true
}
