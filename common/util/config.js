let baseUrl = ""

if(process.env.NODE_ENV === 'development'){
    // 开发环境
	//  baseUrl = 'http://192.168.199.114:9991'
	 // baseUrl = 'http://192.168.199.199:9991'
    // baseUrl = 'http://192.168.199.105:9991'
	// baseUrl = 'http://192.168.199.223:8097'
	// baseUrl = 'https://itree.i-ortho.cn'
	baseUrl = 'http://192.168.199.113:9991'

}else{
	 // baseUrl = 'http://192.168.199.100:9991'
    // 线上环境
    baseUrl = 'https://itree.i-ortho.cn'
    // baseUrl = 'http://192.168.0.205:11000'
}

export default baseUrl
