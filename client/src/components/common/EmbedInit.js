import { LookerEmbedSDK } from "@looker/embed-sdk"

  export const EmbedSDKInit = () => {
        LookerEmbedSDK.init(
            process.env.LOOKERSDK_EMBED_HOST,
            {
              // The location of the service which will privately create a signed URL
              url: '/api/auth'
              , headers: [
                // include some factor which your auth service can use to uniquely identify a user, so that a user specific url can be returned. This could be a token or ID
                { name: 'usertoken', value: 'user1' }
              ]
            }
          )
    }

