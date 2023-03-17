let baseUrl = ""

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    // baseUrl = 'http://192.168.199.108:9991'
    baseUrl = 'http://192.168.199.100:9991'
	// baseUrl = 'http://itree.i-ortho.cn'
    // baseUrl = 'http://192.168.0.205:11000'
	// baseUrl = 'http://139.196.8.40:9991'
}else{
	 baseUrl = 'http://192.168.199.100:9991'
    // 线上环境
    // baseUrl = 'https://itree.i-ortho.cn'
    // baseUrl = 'http://192.168.0.205:11000'
}

export default baseUrl