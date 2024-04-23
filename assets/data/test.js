const orders = [
  {
    id: 23123,
    created_at: now.subtract(1, "hour").toISOString(),
    total: 31.4,
    status: "Cooking",
    user_id: "1",
    order_items: [
      {
        id: 1,
        order_id: 23123,
        size: "M",
        quantity: 2,
        product_id: products[0].id,
        products: products[0],
      },
      {
        id: 2,
        order_id: 23123,
        size: "L",
        quantity: 1,
        product_id: products[1].id,
        products: products[1],
      },
    ],
  },
];

{
  orders?.map((data, index) => (
    <OrderHistoryCard
      key={index.toString()}
      navigationHandler={navigationHandler}
      CartList={data.order_items}
      CartListPrice={data.total}
      OrderDate={data.created_at}
    />
  ));
}


trong component OrderHistoryCard: 
{CartList?.map((data, index) => (
    <TouchableOpacity key={index.toString()} onPress={() => {}}>
      <OrderItemCard
        type={data.products ? data.products.type : ""}
        name={data.products ? data.products.name : ""}
        imagelink_square={
          data.products ? data.products.imagelink_square : ""
        }
        special_ingredient={
          data.products ? data.products.special_ingredient : ""
        }
        size={data.size}
        price={
          data.products && data.products.prices
            ? data.products.prices[0]
            : 0
        }
        quantity={data.quantity}
        //   ItemPrice={data.ItemPrice}
      />
    </TouchableOpacity>
  ))}

  tại sao data trong 
