import { Tab, Tabs, TabsList, TabsPanel } from "woozui";

export const Example = () => (
  <Tabs defaultValue="account" className="w-64">
    <TabsList>
      <Tab value="account">Account</Tab>
      <Tab value="billing">Billing</Tab>
      <Tab value="team">Team</Tab>
    </TabsList>
    <TabsPanel value="account">Manage your account details.</TabsPanel>
    <TabsPanel value="billing">Update your payment method.</TabsPanel>
    <TabsPanel value="team">Invite and remove teammates.</TabsPanel>
  </Tabs>
);
