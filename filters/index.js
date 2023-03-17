const req = require.context('./modules', false, /\.js$/)
// require.context('./svg', false, /\.svg$/) 有时候我们需要一次性的引入某个文件夹下的所有文件，那么这个时候就可以使用require.context()来完成。
// ./svg：需要引入文件的目录
// false：是否查找该目录下的子级目录
// /\.svg$/：匹配引入文件的正则表达式
const requireAll = requireContext => requireContext.keys().map(requireContext)
var fileContent = requireAll(req)// 获取文件内的内容
let filter = { }
fileContent.forEach(element => {
  filter = { ...filter, ...element }
});
export default filter

