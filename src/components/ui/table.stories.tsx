import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./table";

const meta: Meta<typeof Table> = {
  title: "UI/Table",
  component: Table,
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Descricao</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Supermercado</TableCell>
          <TableCell>Alimentacao</TableCell>
          <TableCell>R$ 245,90</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Uber</TableCell>
          <TableCell>Transporte</TableCell>
          <TableCell>R$ 32,00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Netflix</TableCell>
          <TableCell>Entretenimento</TableCell>
          <TableCell>R$ 39,90</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const Compact: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead density="compact">Descricao</TableHead>
          <TableHead density="compact">Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell density="compact">Pix enviado</TableCell>
          <TableCell density="compact">R$ 100,00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell density="compact">Pix recebido</TableCell>
          <TableCell density="compact">R$ 500,00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead sortDirection="ascending">Data</TableHead>
          <TableHead>Descricao</TableHead>
          <TableHead sortDirection="descending">Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow interactive>
          <TableCell>01/11</TableCell>
          <TableCell>Salario</TableCell>
          <TableCell>R$ 5.000,00</TableCell>
        </TableRow>
        <TableRow interactive selected>
          <TableCell>05/11</TableCell>
          <TableCell>Aluguel</TableCell>
          <TableCell>R$ 1.800,00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const Striped: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Mes</TableHead>
          <TableHead>Receita</TableHead>
          <TableHead>Despesa</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {["Janeiro", "Fevereiro", "Marco", "Abril"].map((mes) => (
          <TableRow key={mes} striped>
            <TableCell>{mes}</TableCell>
            <TableCell>R$ 5.000</TableCell>
            <TableCell>R$ 3.200</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
