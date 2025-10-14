export type SurveyTemplateAttributes = {
  /**
   * Description of the survey template
   */
  description?: string
  /**
   * The survey template structure as a JSON object
   */
  surveyTemplate: {
    [key: string]: unknown
  }
}

export type SurveyTemplateCreateDto = {
  /**
   * Name of the survey template
   */
  name: string
  /**
   * Survey template attributes including description and survey template structure
   */
  attributes: SurveyTemplateAttributes
}

export type SurveyTemplateDataEntity = {
  cpk?: string
  csk?: string
  source?: string
  requestId?: string
  createdAt?: string
  updatedAt?: string
  createdBy?: string
  updatedBy?: string
  createdIp?: string
  updatedIp?: string
  pk: string
  sk: string
  id: string
  code: string
  name: string
  version: number
  tenantCode: string
  type: string
  seq?: number
  ttl?: number
  isDeleted?: boolean
  attributes: SurveyTemplateAttributes
}

export type SurveyTemplateDataListEntity = {
  total?: number
  lastSk?: string
  items: Array<SurveyTemplateDataEntity>
}

export type SurveyTemplateUpdateDto = {
  /**
   * Name of the survey template
   */
  name: string
  /**
   * Whether the survey template is deleted
   */
  isDeleted?: boolean
  /**
   * Survey template attributes including description and survey template structure
   */
  attributes: SurveyTemplateAttributes
}

//

export type SurveyTemplateControllerSearchDataData = {
  headers?: {
    'x-tenant-code'?: unknown
  }
  query?: {
    id?: string
    keyword?: string
    orderBys?: Array<string>
    page?: number
    pageSize?: number
    pk?: string
    sk?: string
  }
}

export type SurveyTemplateControllerSearchDataResponse =
  SurveyTemplateDataListEntity

export type SurveyTemplateControllerSearchDataError = unknown

export type SurveyTemplateControllerCreateData = {
  body: SurveyTemplateCreateDto
  headers?: {
    'x-tenant-code'?: unknown
  }
}

export type SurveyTemplateControllerCreateResponse = SurveyTemplateDataEntity

export type SurveyTemplateControllerCreateError = unknown

export type SurveyTemplateControllerGetDataData = {
  headers?: {
    'x-tenant-code'?: unknown
  }
}

export type SurveyTemplateControllerGetDataResponse = SurveyTemplateDataEntity

export type SurveyTemplateControllerGetDataError = unknown

export type SurveyTemplateControllerUpdateDataData = {
  body: SurveyTemplateUpdateDto
  headers?: {
    'x-tenant-code'?: unknown
  }
}

export type SurveyTemplateControllerUpdateDataResponse =
  SurveyTemplateDataEntity

export type SurveyTemplateControllerUpdateDataError = unknown

export type SurveyTemplateControllerDeleteDataData = {
  headers?: {
    'x-tenant-code'?: unknown
  }
}

export type SurveyTemplateControllerDeleteDataResponse =
  SurveyTemplateDataEntity

export type SurveyTemplateControllerDeleteDataError = unknown
