import config from './config.json' assert { type: 'json' };
import { ClientConfig, GPTClient } from './GPTClient.js';

const clientConfig = config as {
	accounts: ClientConfig[]
};

const client = new GPTClient(clientConfig.accounts[0]);


//  {
//             "name": "Graydon",
//             "activities": [
//                 {
//                     "type": "listening",
//                     "name": "Bing Chilling into the Night"
//                 }
//             ],
//             "tokens": {
//                 "discordToken": "MTA1MTU1NTgyOTg1NTI5NzYzNg.GQtcWu.TiiRmcwCowpsW7uoawga8_SYAmUQ7g24jRkM7A",
//                 "chatGPTSession": "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..IpiyWI8_1GXB-Tu6.LG5R2SNMf3aFjvjdGg6JIfHZeujX7Z3JJpCC2NRbqpDvGva8hAstz3VZ8NV8UUYhyc8RcCU8Tf_Sz1QO8oFgrG_WOlPMBiNxyWL6OIqkDkvAdPnsWSz1ZPpz1nfQZAeTVw2HJ1-AqiVS0x16l_Mq1GWTPgMOYtGEtJRAUehjjqS7Mq4UeCQU8KuXges6ZGSBhDrWYjqciInyXbT_faZ7VUkQEHyYjjrCCQg6uOiBHxQ3auRoDHJTdXpAWEITkeHG5MqFg9TIuENA6ylaQRyAd837cZhSm0RLTTWqrr0EesppKQOk9Lh6IAlbQXx772BCoWDpyKOaMZjXKFvsE0_1SNXHx1elpuWzUiVVW19bNBHE-8emDKt3SAy7H5hrv51iet5wsJf0QSw_QpIJXXX42Lmenq2VERtqqW8SpNqNYn3r_3lPMKLys6Mz2-fFfiBoYC8lKAAHcGSnzDOH87srxcpKIP85kCwrwm8CuMMSYAxJUZtVJcb21yD7ErGA4P3GAL5mA-ZsFRCUReAIokKsQTf-U4V5nsBcb5O-wowobdbr36sBZSa1TzWmCQwv9OlnrferD9u_YmuNTZqH01ICvAFajEppAL_RK10nhSsJg6Tkig87f4nPLejlAHTqDzyJtFohwSKO2lyGby8MHWmyD8Mf_L-0uRolriMNuJQ3KzfkdhwMl0j8nOXU7S6I5icMLZtIzqyQYEXDpAYU8gzsxtCCF0l9_A9y2gcSpg5mrGDXg3ZnKVMAyZYyMDeerxZAxbXvllNUa7f_oc3Ohc0sBJBDvd3GGwdRXkaMlwihhwRl5P-5KD4NrE3KGz_sRmx9nE6azEfpMfuRaOxUAVUhgfojoxkejGbOepL-3PTfM-aN7v6B_NxJYLyS55nZxDeI1eoAL1pDVt_SYIiyAMp3rCE2d-9aKSenDAcOg745Ob2R0xUFI9hHAR0oHIJxYXf9N7iyuRE7HBXzhWJ46fZImIeO7QpAjyIlPG0AQRX2zMefRvGEiOnq8xSfSEJtMMclIWCVn01Rb08dhY-b6tHWOE0ii_2z238d4M72kn_uztubwkzLbLI5EBv_4vCm563X0fAVJO6iB4LH4WNdIrvGalPErBPFsfTMnSSTO073gcVB_RgSzn4YYYu2R5Oyt1eBuGGb1EFM4pF_mMbhIBYmVgh9gPHyp-gN1Py4Sb2ngOcRUTvDthz-P0rfRrcdqJkM9ljvMFEqxUcOnoYJV5LlJGXauWq_mzSxq_6H9INMsWzFK2_-5wrsagqskYZRDQyXDNnwpqxQHfbPVfM71hhPTU3kVvPidAEK2mzmlEFQXmj1TMbPsqRs4csZ5bUMzNebVZjR4WX2ohN8q8D911BiDy4eTZOgdcfdj7_VW467NYGWIlaNjKllVJ5Qo52vUeAB2jiFjj2ozZqrHbstyYabsUjmK43fPxl5uiJaJP1cPBeefnwBj53yjnlrGAcDVMuijpxPX4JvYODECly0OAKXdZzyOLUNyZZSEmbiSsjE4m7227f3oblEiUYmhCuOEhXA8XPoXJgpI4FXi8PFI31StgPypCPhouuOYUtUzJ8UJMeGvH35GfMPsKOAQ5d484zO0OMlK-XOucw-F_YMBI0FtAk8JXhuRXrytBUEl9ErdqXQOU4uCx0tIlO83dGYJP049HdO45DRbUI5DJ178PfG-e0FHOWSAu2mfA0US9T3LChWCFz7e8CdDCU2S41PaoVEuxMPpJTtD4JB93qac0P9pyY7gl0dVX3qXTW5lDXB-PPIwIAQRwFxBwhle6bUUhJdpe_KADltCOLuvQQ5V4WG4lDWpua-x8Ae30LpQQTbPGB9l2KycGuOxF4bgYbZDgRNvMReYLtKJXY-I21nnCZNOmAVxMOiNULIjMsI616KE5Kg6NvA50AQzJWOoZgMqLe8tc1eecQgV96bneFSECxhYInyUlwU8YRrpoZtVNOR6jLNC2jiYGnBaQ59e-4vbWZU1m7cYUGunm-HTFL3JOtzcNjb5TG7jLzyROgfhNiN4yGbV5XwdeTokBzImAAqEg8KWyYUc2-AEFIOpBCgmW26PxGdSY2-x-0sj_hSmOQcikoBfxdxIR_DmO29t5OcgwzXbARJtEgxH0cralZUzG2_9Mp7coSXF8hK42jF1lSl1EpJ8ZbSDc81Ri0HbZ6n77u2GCQ6lfDLfLQ88xWMp3_N50pgKVpwiQ_Nm1kkv1qz0ye-D62w-rBJ_8NbUKNgbf5XDMlO0rCpglv5AVGkXR-Egtweeg.ue8KC58skvntGR8Bo3qOeA",
//                 "clearanceToken": "XY.cbEMlQaludC_eVUc8BC26wCrwzRzRShh3gSGpXgM-1670807211-0-160",
//                 "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.5 Safari/605.1.15"
//             },
//             "responseChance": 0.2,
//             "timeout": 4,
//             "keywords": [
//                 {
//                     "word": "java",
//                     "traitId": 1
//                 }
//             ],
//             "overrides": {
//                 "349058934602u7043": [
//                     {
//                         "id": 0,
//                         "text": "You hate fantasy",
//                         "weight": 1
//                     }
//                 ]
//             },
//             "traitNumber": 4,
//             "defaultTraits": [
//                 "Respond in the most toxic chad way:"
//             ],
//             "weightedtraits": [
//                 {
//                     "id": 0,
//                     "text": "You are a chad named graydon",
//                     "weight": 1
//                 },
//                 {
//                     "id": 1,
//                     "text": "You hate java",
//                     "weight": 1
//                 }
//             ]
//         },




                // "chatGPTSession": "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..2fpezfamr-ykhWzz.MeCGOibPY0Saco0_NryN0UdBUCmB465tD9QOuvF5RIZYTIBY-508vYNVdzJr4TmwJJdfCGVhYP9JRC1RKpzhqULgsDrE8ANo1xxCk0jS2ZGCUOutTxsGcgDSysobpr2kPkWllQdKWlTyY84ILBdQKjJuaxlCVmtCX_19vmP63NV-IK-FCKQabBu8yHWegq5Na7Ao12AMZka4Gb-BklJ3Wneo6UoPdY63uhfy0Vm-r-LZw2G-yu8nD7fQqHstvZHUdmizPmeolHN1xXr6KkvOptcTvddDFM7yM8gD4PKHDxMtdDTw1K2yUr3JF6d6LX6yQva0fE9Kq60-kbBXoDUVuY6q__zKpHRkW23eJYY3_1ix7qUOQtzPgvCyAEtGvP6VQp1__ZVB65XNg6qzm_xLx__hNYxnyUdjkLtoX03w-st9baZH_0NCxHKhY-xg1V-LIKXw47XnjAJul7vZqBYtrA_v3gIa5EcYsDXkgGUWQ1LQaQxZiii6Csl0wMNioFb23FqTW3BI8Ux5twkEvUZkRY3113Y-UgeEXfuUOWfXQw9jqBYvtfgjqR6GDaJWgLDgZo72tOmoxgDsh8j4uXeLOk1NfB5Z09RVTfDN8_NYo_kDfTRihVf2sQSnRvpbUKSa4uW1aDAVV57NcENV4r20cMMmBaCNQ6YOlT0O315jCdKuviWmjT1BRSEcP1frZ3MVzE0aWUkFkPtbXBML2cyWCwN3xWanozd1tjJ-yiX5xh-spjPBkiXYcpZ4B8FzakjN6QYcr0e6DfCBtMSdHcjRSs1yvpLBbpf7YrhvkLRT_iIQa3aVI2f_k7WRG_pCPQbdosorQC6AHpO0o8P839n-FDLJQtavReUBbgDBsiIKie5J-vUseyBGSss_tLS7w0nWWmkXk6ovoRylkAeQFlsQtfnt-dZ0ERhFyNek8ze1YNo_XZ0q95sWexVFvmHtLggov1w7TmuVzyKpFttZlLYZW8Hnt189YnwJurjTcUJVHa46yRqeD8vHajo1uLgnKYPh1YE2Kw9uzN8gLDSjV30EyiczEnf2zPiPRWOROrAT5lFyXrsygHiBRUiKp8ybBGsT2ErHnqpjBsAXfQLwkFIb-KI13czq_WQDYigbsuULPH6y_8EgtLzzTjpMVFbvooilOKDFyjWk2kjioc_5m0oVoIHeAPHjOA_e_5ZIAgw5RLlEQjL4WYlfisvSdLjUm5-jbAloIKu-gJXF1L06b8XmGdTC7_WL8VAiauEJ8e2fGGlQxaTZwtgClARVFJcQRX2xZB3z2M2E0XOjZpAa1eBbDYikZymyyO23h7LDCGM6K1ARNKHW448MyMiM81zOnHnu46Dg-Q1-QPbsEV4PB7qlBn5OqIo2xUZaMuH05fXaTQ0jWSWH85p5TOQPfweDifbID4NtQLxXlmtxxMOxb0MdF3dekiwFqeYdUmswHw0eylHMRkRqeLjWRp2XLilVuYebqKOUdeBbju4TpT9yGnwKE5a2l3HSBCdKjnAseh_D3L5FdAQP8idNdpEkKujsw8zWJX6VSiUiA2J_1ExCMW5ooo_z-ZJe6LDpTbtleUv-68wCEbDl6ez1SpORLwwjz6Np-2yr4aXJDdR0LOt-0nGZqbR2e-AlRVE8C50cHkuO6udzdXHCz0T2YqlDzTOMepNNV45SuonG2utNhozLolZ4DKlBAGfmtMejZV6zzHaiDD4gMGLmNVtMvlc6uh5h_ZdNsz_nMVfn5axRxj37wSBcqXDL9OVuD0TBmfb2E0JlsnUK4Y_rVMc1ELVsI0RBmvCiZLQOFFw5ukER44Nk6NmE-6uZgLC3tVhQ8hXz1DjKRqx35fI0orkJf9yEdzRH_PoTZ-H9z7ZZo8_tsd3G-pGMjCyNXwBy8Z-Q68mm25GU5MI9itVEOBw9oBnenRtv64tWc0QhrcEaAVbkZUfT6O-r1Q7F-dPr3n2kGASExzX-3jI8pUqFWG93yKFOdLXMan-uqIWq-d4Z1nKAjtZyMrpBvcQsz4hARIGLlzECyfOUBwmLw8a2pz4UT72bvOM4BawXG9k8xdFBdGqI_3ouX59mOcef6zK9scbIj9blbjVYE_4EfI4KQrYlm3lO8LTlsYfUsQD2K6_Noxo6rNRqoM4bixcTFyXB39sVWWTFaHWKa8lInCB1a9IIsq3OnO9GUtz9_CG-2Ra3-89kDorg1wWDT7rNr8tZ4fX7iNaa6a09RRGSF3UJ3qr9_-eWp7XkUfsz616MftKOM5VBY-pTMMLtF6NJGPqB3M18cVaUjU_9T4NQic315z_TdMVA6VJWfdgJy25MmbKDiKoytUUSN6OG352jQdRWlxe8tugwgX82n6fOdUS3G2OKDlvWEmNQ_ziYM_7UOhqqQEN5NS_hBnI3QUs9duSAwINGh2MPMr6t6ZYjdauGU1MFaiK-BGVWPCPxoNsRsE3v-Z3uBj2hIPILlyHsm1JLcKgobLS-74XHl0jUvoYR.p7t6AvOufmx321T4o_kw_w",
                // "clearanceToken": "3.ICGCrrqiycL2XHV7ir0L7k7XQLLCyZBp8oNNTmm14-1670811363-0-160",
                // "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Safari/605.1.15"