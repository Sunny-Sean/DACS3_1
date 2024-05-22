import { formatDistance, parseISO } from "date-fns";
// import { differenceInDays } from "date-fns/esm";

//làm cho hàm hoạt động cho cả đối tượng Date và chuỗi (đến từ Supabase)
// export const subtractDates = (dateStr1, dateStr2) =>
//   differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

// Tính khoảng thời gian chênh nhau giữa 2 ngày
export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    // Loại bỏ about từ chuỗi
    .replace("about ", "")
    .replace("in", "In");

export const getToday = function (options = {}) {
  const today = new Date();
  // điều này là cần thiết để so sánh với create_at từ Supabase, vì nó không ở mức 0.0.0.0, cần đặt ngày là CUỐI của ngày khi chúng ta so sánh nó với các ngày trước đó
  if (options?.end)
    // đặt đến giây cuối cùng trong ngày hiện tại
    today.setUTCHours(23, 59, 59, 999);
  // hoặc giây đầu tiên trong ngày
  else today.setUTCHours(0, 0, 0, 0);

  // trả về ngày hiện tại dưới dạng chuỗi ISO
  return today.toISOString();
};

// Định dạng tiền
export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

export const formatCurrencyVN = (value) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    value
  );
