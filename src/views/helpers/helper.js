const helpers = {
    getToken : (tokenName) => {
        if(document.cookie){
            const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith(tokenName))
            .split('=')[1];
            return cookieValue
        }
        else
        {
            return ''
        }
    }
}

export default helpers