import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { Ticket } from "../../../pages/dashboard";

Font.register({
  family: "Helvetica",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/helveticaneue/v10/Pxjog20CqTU9CkXrFA01JV0fRcmCkUlVqDqu2e39dbY.woff2",
    },
  ],
});

interface TicketPDFProps {
  ticket: Ticket;
}

const TicketPDF: React.FC<TicketPDFProps> = ({ ticket }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{ticket.store?.name}</Text>
        <Text style={styles.headerText}>CNPJ: {ticket.store?.cnpj}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>{ticket.title}</Text>
        <Text style={styles.text}>Descrição: {ticket.description}</Text>
        <Text style={styles.text}>Data: {ticket.date}</Text>
        <Text style={styles.text}>Data de término: {ticket.end_date}</Text>
        <Text style={styles.text}>Tipo: {ticket.type}</Text>
        <Text style={styles.text}>Suporte: {ticket.support}</Text>
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  headerText: {
    fontSize: 14,
  },
  section: {
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default TicketPDF;
