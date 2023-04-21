import {
  B3Request,
} from '../../request/b3Fetch'

import {
  storeHash,
} from '../../../../utils'

const getB2BTokenQl = (bcJwtToken: string, channelId: number) => `mutation {
  authorization(authData: {
    bcToken: "${bcJwtToken}"
    channelId: ${channelId}
  }) {
    result {
      token
    }
  }
}`

const getAgentInfoQl = (customerId: string | number) => `{
  superAdminMasquerading(customerId: ${customerId}) {
    companyName,
    bcGroupName,
    companyStatus,
    id
  }
}`

const superAdminCompaniesQl = (id: number, params: CustomFieldItems) => `{
  superAdminCompanies(
    superAdminId: ${id}
    first: ${params.first}
    offset: ${params.offset}
    search: "${params.q || ''}"
  ) {
    edges{
      node{
        companyId,
        id,
        companyName,
        companyEmail,
        companyAdminName,
      }
    },
    totalCount
  }
}`

const superAdminBeginMasqueradeQl = (companyId: string | number, userId: number) => `mutation {
  superAdminBeginMasquerade(
    companyId: ${companyId}
    userId: ${userId}
  ) {
    userInfo {
      email,
      phoneNumber,
    }
  }
}`

const superAdminEndMasqueradeQl = (companyId: string | number, userId: number) => `mutation {
  superAdminEndMasquerade(
    companyId: ${companyId}
    userId: ${userId}
  ) {
    message
  }
}`

const userCompanyQl = (userId: number) => `{
  userCompany(
    userId: ${userId}
  ) {
    companyName,
    companyStatus,
    id,
  }
}`

const storefrontConfig = () => `{
  storefrontConfig(
    storeHash: "${storeHash}"
  ) {
    config{
      accountSettings,
      addressBook,
      buyAgain,
      dashboard,
      invoice{
        enabledStatus,
        value,
      },
      messages,
      orders,
      quickOrderPad,
      quotes,
      recentlyViewed,
      returns,
      shoppingLists,
      tradeProfessionalApplication,
      userManagement,
      wishLists,
    }
    configId,
  }
}`

const currencies = (channelId: string) => `{
  currencies(
    storeHash: "${storeHash}",
    channelId: "${channelId}",
  ) {
    currencies {
      id,
      is_default,
      last_updated,
      country_iso2,
      default_for_country_codes,
      currency_code,
      currency_exchange_rate,
      name,
      token,
      auto_update,
      decimal_token,
      decimal_places,
      enabled,
      is_transactional,
      token_location,
      thousands_token,
    },
    channelCurrencies,
  }
}`

// type storefrontConfigsProps = {
//   key: String,
//   value: String,
//   extraFields: any,
// }

const storefrontConfigs = (channelId: number, keys: string[]) => `{
  storefrontConfigs(
    storeHash: "${storeHash}",
    channelId: ${channelId},
    keys: "${keys}"
  ) {
    key,
    value,
    extraFields,
  }
}`

const taxZoneRates = () => `{
  taxZoneRates(storeHash: "${storeHash}") {
    rates {
      id,
      name,
      enabled,
      priority,
      classRates {
        rate,
        taxClassId,
      }
    },
    enabled,
    id,
    name,
  }
}`

export const getB2BToken = (bcJwtToken: string, channelId: number = 1): CustomFieldItems => B3Request.graphqlB2B({
  query: getB2BTokenQl(bcJwtToken, channelId),
})

export const getAgentInfo = (customerId: string | number): CustomFieldItems => B3Request.graphqlB2B({
  query: getAgentInfoQl(customerId),
})

export const superAdminCompanies = (id: number, params: CustomFieldItems): CustomFieldItems => B3Request.graphqlB2B({
  query: superAdminCompaniesQl(id, params),
})

export const superAdminBeginMasquerade = (companyId: number, userId: number): CustomFieldItems => B3Request.graphqlB2B({
  query: superAdminBeginMasqueradeQl(companyId, userId),
})

export const superAdminEndMasquerade = (companyId: number, userId: number): CustomFieldItems => B3Request.graphqlB2B({
  query: superAdminEndMasqueradeQl(companyId, userId),
})

export const getUserCompany = (userId: number): CustomFieldItems => B3Request.graphqlB2B({
  query: userCompanyQl(userId),
})

export const getStorefrontConfig = (): CustomFieldItems => B3Request.graphqlB2B({
  query: storefrontConfig(),
})

export const getCurrencies = (channelId: string): CustomFieldItems => B3Request.graphqlB2B({
  query: currencies(channelId),
})
export const getBcCurrencies = (channelId: string): CustomFieldItems => B3Request.graphqlProxyBC({
  query: currencies(channelId),
})

export const getStorefrontConfigs = (channelId: number, keys: string[]): CustomFieldItems => B3Request.graphqlB2B({
  query: storefrontConfigs(channelId, keys),
})

export const getTaxZoneRates = (): CustomFieldItems => B3Request.graphqlB2B({
  query: taxZoneRates(),
})
