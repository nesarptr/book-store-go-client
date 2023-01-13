"use client";

import Payment from "../../../components/payment/Payment";

export default function Page({ params }: { params: { orderId: string } }) {
  return <Payment id={params.orderId} />;
}
