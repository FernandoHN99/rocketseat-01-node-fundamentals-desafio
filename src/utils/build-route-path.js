export function buildRoutePath(path) {
   const routeParametersRegex = /:([a-zA-Z]+)/g
   const paramsWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')
 
   const pathRegex = new RegExp(`^${paramsWithParams}(?<query>\\?(.*))?$`)

   return pathRegex
 }


 export function extractQueryParams(query) {

   return query.substr(1).split('&').reduce((queryParams, param) => {
     const [key, value] = param.split('=')
     queryParams[key] = value
     return queryParams
   }, {})
   
 }

 export function criarStrData(dias = 0, meses = 0, anos = 0, data = new Date()) {
   return new Date(data.getFullYear() + anos, data.getMonth() + meses, data.getDate() + dias).toISOString().split('T')[0];
}