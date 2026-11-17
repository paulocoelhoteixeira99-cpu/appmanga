import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";

const meta: Meta = {
  title: "UI/Tabs",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="visao-geral">
      <TabsList>
        <TabsTrigger value="visao-geral">Visao Geral</TabsTrigger>
        <TabsTrigger value="transacoes">Transacoes</TabsTrigger>
        <TabsTrigger value="metas">Metas</TabsTrigger>
      </TabsList>
      <TabsContent value="visao-geral">Conteudo da visao geral</TabsContent>
      <TabsContent value="transacoes">Lista de transacoes</TabsContent>
      <TabsContent value="metas">Suas metas financeiras</TabsContent>
    </Tabs>
  ),
};

export const LineVariant: Story = {
  render: () => (
    <Tabs defaultValue="mensal">
      <TabsList variant="line">
        <TabsTrigger value="mensal">Mensal</TabsTrigger>
        <TabsTrigger value="semanal">Semanal</TabsTrigger>
        <TabsTrigger value="diario">Diario</TabsTrigger>
      </TabsList>
      <TabsContent value="mensal">Resumo mensal</TabsContent>
      <TabsContent value="semanal">Resumo semanal</TabsContent>
      <TabsContent value="diario">Resumo diario</TabsContent>
    </Tabs>
  ),
};

export const WithDisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="ativo">
      <TabsList>
        <TabsTrigger value="ativo">Ativo</TabsTrigger>
        <TabsTrigger value="desabilitado" disabled>Desabilitado</TabsTrigger>
      </TabsList>
      <TabsContent value="ativo">Tab ativa</TabsContent>
    </Tabs>
  ),
};
