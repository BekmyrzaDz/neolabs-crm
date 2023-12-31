import React, { useState, useEffect } from "react"
import {
  creditCard,
  elcard,
  kicb,
  odengi,
  optima,
  visa,
  wallet,
} from "../../assets"
import Header from "../Header/Header"
import Card from "../PaymentCard/Card"
import styles from "./Payment.module.scss"
import CompositeTable from "../Table/Table"
import { rows } from "../../mockApi"
import { useGetAllStudentsQuery } from "../../redux/payment"
import Spinner from "../../../../components/spinner/spinner"

interface IPayment {
  id: number
  client_card: {
    fio: string
    payment_status: number
  }
  course: {
    name: string
  }
  payment_type: {
    id: number
    name: string
  }
  last_payment_date: string
  payment_time: string
  amount: string
  acceptBy: string
}

interface IInitialState {
  id: number
  payment_type: string
  payment_time: string
  last_payment_date: string
  acceptBy: string
  fio: string
  amount: string
  payment_status: string
}

interface IPaymentMethod {
  id: number
  logo: string
  paymentType: string
  paymentTypeImg: string
  cardNumber: number
  first_name: string
  last_name: string
  limit?: string
  cardTypeImg?: string
}

const paymentMethodData: IPaymentMethod[] = [
  {
    id: 1,
    logo: optima,
    paymentType: "Картой",
    paymentTypeImg: creditCard,
    cardNumber: 4728910024567358,
    first_name: "Daniil",
    last_name: "Aleshin",
    limit: "08/24",
    cardTypeImg: visa,
  },
  {
    id: 2,
    logo: kicb,
    paymentType: "Картой",
    paymentTypeImg: creditCard,
    cardNumber: 9417018844503805,
    first_name: "Bekmyrza",
    last_name: "Dzhumakadyrov",
    limit: "07/27",
    cardTypeImg: elcard,
  },
  {
    id: 3,
    logo: odengi,
    paymentType: "Электронный кошелек",
    paymentTypeImg: wallet,
    cardNumber: 5184876755,
    first_name: "Ruslan",
    last_name: "Sabitov",
  },
]

interface Props {}

export const Payment = (props: Props) => {
  // Students get all hooks
  const {
    isLoading: areAllStudentsLoading,
    isError: areAllStudentsError,
    data: allStudents,
  } = useGetAllStudentsQuery()

  if (areAllStudentsLoading) {
    return <Spinner />
  }

  return (
    <div className={styles.payment}>
      <Header />
      <div className={styles.content}>
        <div className={styles.cards}>
          {paymentMethodData.map((method, index) => (
            <Card
              key={index}
              id={method.id}
              logo={method.logo}
              paymentType={method.paymentType}
              paymentTypeImg={method.paymentTypeImg}
              cardNumber={method.cardNumber}
              first_name={method.first_name}
              last_name={method.last_name}
              limit={method.limit}
              cardTypeImg={method.cardTypeImg}
            />
          ))}
        </div>
        <div className={styles.table}>
          <CompositeTable rows={allStudents || []} />
        </div>
      </div>
    </div>
  )
}
