"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { TextArea } from "@/components/ui/text-area";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
import { RadioGroup, RadioItem } from "@/components/ui/radio-group";
import { Skeleton, SkeletonText, SkeletonCircle } from "@/components/ui/skeleton";
import { ListItem, ListDivider } from "@/components/ui/list-item";
import { EmptyState } from "@/components/ui/empty-state";
import { BottomNav, BottomNavItem } from "@/components/ui/bottom-nav";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

// Product components
import { Logo } from "@/components/product/logo";
import { TransactionItem } from "@/components/product/transaction-item";
import { AccountCard } from "@/components/product/account-card";
import { BalanceCard } from "@/components/product/balance-card";
import { GoalCard } from "@/components/product/goal-card";
import { CategoryItem } from "@/components/product/category-item";
import { FinancialSummary } from "@/components/product/financial-summary";

export default function ComponentsShowcasePage() {
  const [inputValue, setInputValue] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");
  const [loadingButtons, setLoadingButtons] = useState<Record<string, boolean>>({});
  const [alertVisible, setAlertVisible] = useState(true);
  const [radioValue, setRadioValue] = useState("option1");
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  function simulateLoading(key: string) {
    setLoadingButtons((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setLoadingButtons((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-mango-cream pb-24">
        <Toaster />
        <header className="border-b border-neutral-200 bg-white sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <h1 className="text-xl font-bold text-mango-night">
              Manga — Component Showcase
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Uso interno. Visualizacao dos componentes do Design System.
            </p>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8 space-y-16">
          {/* ── Button ── */}
          <section>
            <SectionTitle>Button</SectionTitle>
            <div className="space-y-6">
              <Group title="Variants">
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
              </Group>
              <Group title="Sizes">
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </Group>
              <Group title="States">
                <div className="flex flex-wrap items-center gap-3">
                  <Button>Default</Button>
                  <Button disabled>Disabled</Button>
                  <Button
                    loading={loadingButtons["primary-loading"]}
                    onClick={() => simulateLoading("primary-loading")}
                  >
                    Click to load
                  </Button>
                </div>
              </Group>
              <Group title="Full width">
                <div className="max-w-sm space-y-3">
                  <Button className="w-full">Primary full width</Button>
                  <Button variant="secondary" className="w-full">
                    Secondary full width
                  </Button>
                </div>
              </Group>
            </div>
          </section>

          {/* ── TextField ── */}
          <section>
            <SectionTitle>TextField</SectionTitle>
            <div className="max-w-sm space-y-6">
              <Group title="Default">
                <TextField label="Label" placeholder="Digite um valor" helperText="Texto de apoio" />
              </Group>
              <Group title="Interactive">
                <TextField
                  label="Nome"
                  placeholder="Seu nome"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  helperText={inputValue ? `${inputValue.length} caracteres` : "Comece a digitar"}
                />
              </Group>
              <Group title="Error">
                <TextField label="Telefone" type="tel" value="(11) 9999" error="Telefone deve ter 11 digitos." onChange={() => {}} />
              </Group>
              <Group title="Disabled">
                <TextField label="E-mail" value="usuario@manga.com" disabled helperText="Nao pode ser alterado." />
              </Group>
            </div>
          </section>

          {/* ── TextArea ── */}
          <section>
            <SectionTitle>TextArea</SectionTitle>
            <div className="max-w-sm space-y-6">
              <Group title="Default">
                <TextArea label="Observacao" placeholder="Escreva uma observacao..." helperText="Texto de apoio" />
              </Group>
              <Group title="Interactive">
                <TextArea
                  label="Notas"
                  placeholder="Adicione notas..."
                  value={textAreaValue}
                  onChange={(e) => setTextAreaValue(e.target.value)}
                  helperText={`${textAreaValue.length} / 500`}
                />
              </Group>
            </div>
          </section>

          {/* ── Card ── */}
          <section>
            <SectionTitle>Card</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardHeader>Default</CardHeader>
                <CardContent>Superficie basica sem sombra.</CardContent>
                <CardFooter>Atualizado hoje</CardFooter>
              </Card>
              <Card variant="elevated">
                <CardHeader>Elevated</CardHeader>
                <CardContent>Com sombra sutil para destaque.</CardContent>
                <CardFooter>Atualizado hoje</CardFooter>
              </Card>
              <Card variant="outline">
                <CardHeader>Outline</CardHeader>
                <CardContent>Com borda ao inves de sombra.</CardContent>
                <CardFooter>Atualizado hoje</CardFooter>
              </Card>
            </div>
          </section>

          {/* ── Alert ── */}
          <section>
            <SectionTitle>Alert</SectionTitle>
            <div className="space-y-4">
              <Alert type="success" title="Sucesso">
                Perfil atualizado com sucesso.
              </Alert>
              <Alert type="warning" title="Atencao">
                Sua assinatura expira em 3 dias.
              </Alert>
              <Alert type="danger" title="Erro">
                Nao foi possivel salvar. Tente novamente.
              </Alert>
              <Alert type="info" title="Informacao">
                Novos recursos disponiveis na proxima versao.
              </Alert>
              {alertVisible && (
                <Alert type="info" title="Dispensavel" onClose={() => setAlertVisible(false)}>
                  Clique no X para fechar este alerta.
                </Alert>
              )}
              {!alertVisible && (
                <button
                  onClick={() => setAlertVisible(true)}
                  className="text-sm text-primary-500 hover:text-primary-600"
                >
                  Mostrar alerta novamente
                </button>
              )}
            </div>
          </section>

          {/* ── Badge ── */}
          <section>
            <SectionTitle>Badge</SectionTitle>
            <div className="space-y-6">
              <Group title="Tones — Small">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="neutral">Neutro</Badge>
                  <Badge tone="success">Sucesso</Badge>
                  <Badge tone="warning">Atencao</Badge>
                  <Badge tone="danger">Erro</Badge>
                  <Badge tone="info">Info</Badge>
                </div>
              </Group>
              <Group title="Tones — Medium">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="neutral" size="md">Neutro</Badge>
                  <Badge tone="success" size="md">Sucesso</Badge>
                  <Badge tone="warning" size="md">Atencao</Badge>
                  <Badge tone="danger" size="md">Erro</Badge>
                  <Badge tone="info" size="md">Info</Badge>
                </div>
              </Group>
            </div>
          </section>

          {/* ── Avatar ── */}
          <section>
            <SectionTitle>Avatar</SectionTitle>
            <div className="space-y-6">
              <Group title="Sizes — Circle + Initials">
                <div className="flex items-center gap-3">
                  <Avatar size="xs" initials="M" />
                  <Avatar size="sm" initials="AM" />
                  <Avatar size="md" initials="PU" />
                  <Avatar size="lg" initials="JS" />
                </div>
              </Group>
              <Group title="Sizes — Rounded + Initials">
                <div className="flex items-center gap-3">
                  <Avatar size="xs" shape="rounded" initials="M" />
                  <Avatar size="sm" shape="rounded" initials="AM" />
                  <Avatar size="md" shape="rounded" initials="PU" />
                  <Avatar size="lg" shape="rounded" initials="JS" />
                </div>
              </Group>
              <Group title="Fallback (sem imagem nem iniciais)">
                <div className="flex items-center gap-3">
                  <Avatar size="sm" />
                  <Avatar size="md" />
                  <Avatar size="lg" />
                </div>
              </Group>
            </div>
          </section>

          {/* ── Spinner ── */}
          <section>
            <SectionTitle>Spinner</SectionTitle>
            <div className="space-y-6">
              <Group title="Sizes">
                <div className="flex items-center gap-4">
                  <Spinner size="sm" />
                  <Spinner size="md" />
                  <Spinner size="lg" />
                </div>
              </Group>
              <Group title="Variants">
                <div className="flex items-center gap-4">
                  <Spinner variant="primary" />
                  <Spinner variant="neutral" />
                  <div className="bg-mango-night rounded-lg p-3 inline-flex">
                    <Spinner variant="inverse" />
                  </div>
                </div>
              </Group>
            </div>
          </section>

          <Separator />

          {/* ── Checkbox (shadcn) ── */}
          <section>
            <SectionTitle>Checkbox</SectionTitle>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <Checkbox
                  checked={checkboxChecked}
                  onCheckedChange={(val) => setCheckboxChecked(val === true)}
                />
                <span className="text-sm text-neutral-900">Aceito os termos de uso</span>
              </label>
              <label className="flex items-center gap-3 opacity-50">
                <Checkbox checked disabled />
                <span className="text-sm text-neutral-900">Checkbox desabilitado</span>
              </label>
            </div>
          </section>

          {/* ── Switch (shadcn) ── */}
          <section>
            <SectionTitle>Switch</SectionTitle>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <Switch
                  checked={switchChecked}
                  onCheckedChange={(val) => setSwitchChecked(val === true)}
                />
                <span className="text-sm text-neutral-900">Notificacoes push</span>
              </label>
              <label className="flex items-center gap-3 opacity-50">
                <Switch checked disabled />
                <span className="text-sm text-neutral-900">Switch desabilitado</span>
              </label>
            </div>
          </section>

          {/* ── Radio Group ── */}
          <section>
            <SectionTitle>Radio Group</SectionTitle>
            <div className="max-w-sm">
              <RadioGroup value={radioValue} onChange={setRadioValue}>
                <RadioItem value="option1" label="Conta corrente" description="Sua conta principal" />
                <RadioItem value="option2" label="Poupanca" description="Reserva de emergencia" />
                <RadioItem value="option3" label="Investimentos" description="Renda variavel e fixa" />
              </RadioGroup>
            </div>
          </section>

          {/* ── Select (shadcn) ── */}
          <section>
            <SectionTitle>Select</SectionTitle>
            <div className="max-w-sm">
              <Select defaultValue="mensal">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a frequencia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diario">Diario</SelectItem>
                  <SelectItem value="semanal">Semanal</SelectItem>
                  <SelectItem value="mensal">Mensal</SelectItem>
                  <SelectItem value="anual">Anual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </section>

          {/* ── Tabs (shadcn) ── */}
          <section>
            <SectionTitle>Tabs</SectionTitle>
            <Tabs defaultValue="resumo">
              <TabsList>
                <TabsTrigger value="resumo">Resumo</TabsTrigger>
                <TabsTrigger value="receitas">Receitas</TabsTrigger>
                <TabsTrigger value="despesas">Despesas</TabsTrigger>
              </TabsList>
              <TabsContent value="resumo">
                <Card variant="outline" className="mt-3">
                  <CardContent>Visao geral das suas financas.</CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="receitas">
                <Card variant="outline" className="mt-3">
                  <CardContent>Suas receitas do mes.</CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="despesas">
                <Card variant="outline" className="mt-3">
                  <CardContent>Suas despesas do mes.</CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>

          {/* ── Progress (shadcn) ── */}
          <section>
            <SectionTitle>Progress</SectionTitle>
            <div className="max-w-sm space-y-6">
              <Progress value={65}>
                <ProgressLabel>Meta de economia</ProgressLabel>
                <ProgressValue />
              </Progress>
              <Progress value={30}>
                <ProgressLabel>Limite do cartao</ProgressLabel>
                <ProgressValue />
              </Progress>
            </div>
          </section>

          {/* ── Dialog (shadcn) ── */}
          <section>
            <SectionTitle>Dialog</SectionTitle>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger render={<Button variant="secondary" />}>
                Abrir Dialog
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirmar exclusao</DialogTitle>
                  <DialogDescription>
                    Tem certeza que deseja excluir esta transacao? Esta acao nao pode ser desfeita.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-semibold text-neutral-900 hover:bg-neutral-100 transition-colors">
                    Cancelar
                  </DialogClose>
                  <Button variant="destructive" onClick={() => setDialogOpen(false)}>
                    Excluir
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </section>

          {/* ── Drawer (shadcn) ── */}
          <section>
            <SectionTitle>Drawer</SectionTitle>
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
              <DrawerTrigger render={<Button variant="secondary" />}>
                Abrir Drawer
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Nova transacao</DrawerTitle>
                  <DrawerDescription>
                    Adicione uma nova receita ou despesa.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="px-4 py-4 space-y-4">
                  <TextField label="Descricao" placeholder="Ex: Almoco" />
                  <TextField label="Valor" type="number" placeholder="0,00" />
                </div>
                <DrawerFooter>
                  <Button className="w-full">Salvar</Button>
                  <DrawerClose render={<Button variant="secondary" className="w-full" />}>
                    Cancelar
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </section>

          {/* ── Toast (Sonner) ── */}
          <section>
            <SectionTitle>Toast (Sonner)</SectionTitle>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" onClick={() => toast.success("Transacao salva!")}>
                Success
              </Button>
              <Button variant="secondary" onClick={() => toast.error("Erro ao salvar.")}>
                Error
              </Button>
              <Button variant="secondary" onClick={() => toast.warning("Limite proximo.")}>
                Warning
              </Button>
              <Button variant="secondary" onClick={() => toast.info("Dica: use o WhatsApp para registrar gastos.")}>
                Info
              </Button>
            </div>
          </section>

          {/* ── Tooltip (shadcn) ── */}
          <section>
            <SectionTitle>Tooltip</SectionTitle>
            <div className="flex gap-4">
              <Tooltip>
                <TooltipTrigger render={<Button variant="secondary" />}>
                  Passe o mouse
                </TooltipTrigger>
                <TooltipContent>
                  Tooltip com informacao extra
                </TooltipContent>
              </Tooltip>
            </div>
          </section>

          {/* ── Separator ── */}
          <section>
            <SectionTitle>Separator</SectionTitle>
            <div className="space-y-4">
              <p className="text-sm text-neutral-600">Conteudo acima</p>
              <Separator />
              <p className="text-sm text-neutral-600">Conteudo abaixo</p>
            </div>
          </section>

          {/* ── List Item ── */}
          <section>
            <SectionTitle>List Item</SectionTitle>
            <Card variant="outline" className="overflow-hidden">
              <ListItem
                leading={<Avatar size="sm" initials="MC" />}
                title="McDonald's"
                subtitle="Alimentacao — hoje"
                trailing={<span className="text-sm font-semibold text-error-500">-R$ 42,90</span>}
              />
              <ListDivider />
              <ListItem
                leading={<Avatar size="sm" initials="NB" />}
                title="Nubank"
                subtitle="Receita — ontem"
                trailing={<span className="text-sm font-semibold text-success-500">+R$ 3.200,00</span>}
              />
              <ListDivider />
              <ListItem
                leading={<Avatar size="sm" initials="SP" />}
                title="Spotify"
                subtitle="Assinatura — 28/10"
                trailing={<span className="text-sm font-semibold text-error-500">-R$ 21,90</span>}
              />
            </Card>
          </section>

          {/* ── Skeleton ── */}
          <section>
            <SectionTitle>Skeleton</SectionTitle>
            <div className="space-y-6">
              <Group title="Formas basicas">
                <div className="flex items-center gap-4">
                  <SkeletonCircle />
                  <div className="flex-1">
                    <SkeletonText />
                  </div>
                </div>
              </Group>
              <Group title="Card skeleton">
                <Card variant="outline" className="max-w-sm">
                  <CardContent>
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-8 w-2/3" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </CardContent>
                </Card>
              </Group>
            </div>
          </section>

          {/* ── Empty State ── */}
          <section>
            <SectionTitle>Empty State</SectionTitle>
            <Card variant="outline">
              <EmptyState
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-12">
                    <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 12 7.4l3.38 4.6L17 10.83 14.92 8H20v6z" />
                  </svg>
                }
                title="Nenhuma transacao"
                description="Comece registrando sua primeira receita ou despesa pelo WhatsApp."
                action={<Button>Adicionar transacao</Button>}
              />
            </Card>
          </section>

          {/* ── Bottom Navigation ── */}
          <section>
            <SectionTitle>Bottom Navigation</SectionTitle>
            <p className="text-sm text-neutral-500 mb-4">Preview estatico (nao fixo nesta pagina)</p>
            <Card variant="outline" className="overflow-hidden">
              <div className="relative flex items-center justify-around border-t border-neutral-200 bg-white px-2 py-1">
                <BottomNavPreview icon={HomeIcon} label="Inicio" active />
                <BottomNavPreview icon={ChartIcon} label="Resumo" />
                <BottomNavPreview icon={PlusIcon} label="Adicionar" />
                <BottomNavPreview icon={GoalIcon} label="Metas" />
                <BottomNavPreview icon={ProfileIcon} label="Perfil" />
              </div>
            </Card>
          </section>

          <Separator />

          {/* ══════ PRODUCT COMPONENTS ══════ */}

          {/* ── Logo ── */}
          <section>
            <SectionTitle>Logo</SectionTitle>
            <div className="space-y-6">
              <Group title="Sizes">
                <div className="flex items-center gap-6">
                  <Logo size="sm" />
                  <Logo size="md" />
                  <Logo size="lg" />
                </div>
              </Group>
              <Group title="Sobre fundo escuro">
                <div className="bg-mango-night rounded-xl p-6 inline-flex">
                  <Logo size="md" />
                </div>
              </Group>
            </div>
          </section>

          {/* ── Transaction Item ── */}
          <section>
            <SectionTitle>Transaction Item</SectionTitle>
            <Card variant="outline" className="overflow-hidden">
              <TransactionItem
                icon={<WalletIcon className="size-6" />}
                title="Salario"
                subtitle="18 out · Conta principal"
                value="R$ 2.500,00"
                type="income"
              />
              <ListDivider />
              <TransactionItem
                icon={<WalletIcon className="size-6" />}
                title="Supermercado Extra"
                subtitle="17 out · Cartao Nubank"
                value="R$ 245,90"
                type="expense"
              />
              <ListDivider />
              <TransactionItem
                icon={<WalletIcon className="size-6" />}
                title="Transferencia para poupanca"
                subtitle="15 out · Conta principal"
                value="R$ 500,00"
                type="transfer"
              />
            </Card>
          </section>

          {/* ── Account Card ── */}
          <section>
            <SectionTitle>Account Card</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AccountCard
                initials="MP"
                title="Conta principal"
                accountType="Conta corrente"
                value="R$ 12.450,00"
                supportingText="Atualizado hoje"
              />
              <AccountCard
                variant="elevated"
                initials="NB"
                title="Nubank"
                accountType="Conta digital"
                value="R$ 3.200,00"
                supportingText="Atualizado hoje"
              />
            </div>
          </section>

          {/* ── Balance Card ── */}
          <section>
            <SectionTitle>Balance Card</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <BalanceCard
                icon={<WalletIcon className="size-6" />}
                title="Saldo disponivel"
                value="R$ 12.450,00"
                supportingText="Atualizado hoje"
              />
              <BalanceCard
                style="subtle"
                icon={<WalletIcon className="size-6" />}
                title="Investimentos"
                value="R$ 8.300,00"
                supportingText="Renda fixa + variavel"
              />
              <BalanceCard
                style="brand"
                icon={<WalletIcon className="size-6" />}
                title="Patrimonio total"
                value="R$ 20.750,00"
                supportingText="Todas as contas"
              />
            </div>
          </section>

          {/* ── Goal Card ── */}
          <section>
            <SectionTitle>Goal Card</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <GoalCard
                initials="RV"
                title="Reserva de viagem"
                value="R$ 6.500,00"
                target="de R$ 10.000,00"
                percentage={65}
                status="Ativa"
                supportingText="Faltam R$ 3.500,00 · ate dez 2026"
              />
              <GoalCard
                variant="elevated"
                initials="RE"
                title="Reserva de emergencia"
                value="R$ 15.000,00"
                target="de R$ 15.000,00"
                percentage={100}
                status="Concluida"
                supportingText="Meta atingida!"
              />
            </div>
          </section>

          {/* ── Category Item ── */}
          <section>
            <SectionTitle>Category Item</SectionTitle>
            <Card variant="outline" className="overflow-hidden">
              <CategoryItem
                icon={<WalletIcon className="size-6" />}
                name="Alimentacao"
                subtitle="Categoria personalizada"
                value="R$ 1.234,56"
              />
              <ListDivider />
              <CategoryItem
                icon={<WalletIcon className="size-6" />}
                name="Transporte"
                subtitle="Uber, onibus, metro"
                value="R$ 456,00"
              />
              <ListDivider />
              <CategoryItem
                icon={<WalletIcon className="size-6" />}
                name="Lazer"
                subtitle="Streaming, jogos, cinema"
                value="R$ 189,90"
              />
            </Card>
          </section>

          {/* ── Financial Summary ── */}
          <section>
            <SectionTitle>Financial Summary</SectionTitle>
            <div className="max-w-md">
              <FinancialSummary
                icon={<WalletIcon className="size-6" />}
                title="Resumo financeiro"
                period="Outubro de 2026"
                primaryLabel="Resultado do periodo"
                primaryValue="R$ 2.254,10"
                receitasValue="R$ 2.500,00"
                despesasValue="R$ 245,90"
                supportingText="Receitas - despesas = resultado"
              />
            </div>
          </section>

          {/* ── Form example ── */}
          <section>
            <SectionTitle>Form example</SectionTitle>
            <Card variant="outline" className="max-w-sm">
              <CardContent>
                <div className="space-y-4">
                  <TextField label="Primeiro nome" placeholder="Como podemos te chamar?" required />
                  <TextField label="E-mail" type="email" placeholder="seu@email.com" required />
                  <TextArea label="Bio" placeholder="Conte um pouco sobre voce..." helperText="Opcional" />
                  <TextField label="Senha" type="password" placeholder="Minimo 6 caracteres" required />
                  <Button className="w-full">Criar conta</Button>
                  <Button variant="secondary" className="w-full">Voltar</Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </TooltipProvider>
  );
}

/* ── Helper components ── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-semibold text-neutral-900 mb-6 pb-2 border-b border-neutral-200">
      {children}
    </h2>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-3">
        {title}
      </h3>
      {children}
    </div>
  );
}

function BottomNavPreview({ icon: Icon, label, active }: { icon: React.FC<{ className?: string }>; label: string; active?: boolean }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-0.5 py-2 px-3 min-w-[64px] ${active ? "text-primary-500" : "text-neutral-500"}`}>
      <Icon className="size-6" />
      <span className="text-[10px] font-medium leading-[1.5]">{label}</span>
    </div>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </svg>
  );
}

function GoalIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
    </svg>
  );
}

function WalletIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  );
}

function ProfileIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}
