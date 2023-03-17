// import parseTime, formatTime and set to filter

export function doubtStatus(item) {
  switch (item) {
    case "":
      return "";
    case "1":
      return "待回复";
    case "2":
      return "已回复";
    case "3":
      return "已解除";
    default:
      return "数据异常";
  }
}
