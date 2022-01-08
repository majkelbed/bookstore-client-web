import { Container, Row, Col, Card, Table } from "react-bootstrap";
import { useListOrdersQuery } from "../../app/services/order.service";

export const Orders = () => {
  const { data: orders, isLoading } = useListOrdersQuery();

  if (isLoading) {
    return <div>Wczytywanie zamówień</div>;
  }

  if (!orders?.length) {
    return <div>Nie masz żadnych zamówień</div>;
  }

  return (
    <Container>
      <Row>
        {orders.map((order) => (
          <Col className="mb-3" key={order.orderId} xs={12}>
            <Card>
              <Card.Body className="p-0">
                <Table className="m-0">
                  <thead>
                    <tr>
                      <th style={{ width: "200px" }}>Ilość</th>
                      <th>Nazwa produktu</th>
                      <th style={{ width: "200px" }}>Cena brutto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderDetails.map((product) => (
                      <tr key={product.productId}>
                        <td>{product.quantity}</td>
                        <td>{product.productName}</td>
                        <td>{product.price.toFixed(2)} PLN</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="d-flex align-items-center">
                  <div className="py-3 px-4">
                    Data złożenia zamówienia:{" "}
                    {new Date(
                      Date.parse(order.receivedAt)
                    ).toLocaleString('pl-PL')}
                  </div>
                  <div className="d-flex align-items-center ms-auto text-black">
                    Razem:
                    <div className="ms-2 me-4" style={{ width: "152px" }}>
                      
                      {order.orderDetails
                        .reduce((sum, product) => sum + product.price, 0)
                        .toFixed(2)} PLN
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
