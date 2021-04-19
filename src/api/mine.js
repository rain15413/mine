import axios from 'axios'

export const GetAnswer = params => {
    return axios.get('https://yesno.wtf/api', { params: params }).then((res) => {
        console.log(res)
    })
    // return axios({
    //     url: 'https://yesno.wtf/api',
    //     method: 'get'
    // }).then(function(response){
    //     console.log(1)
    //     that.answer=_.capitalize(response.data.answer)
    // }).catch(function(error){
    //     'Error! Could not reach the API. ' + error
    // })
}
