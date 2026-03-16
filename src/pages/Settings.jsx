import { useState } from 'react'
import { Sun, Moon, Bell, Building2, DollarSign, User, Shield, Save } from 'lucide-react'
import { useTheme } from '../ThemeContext'

function Section({ icon: Icon, title, description, children }) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6">
      <div className="flex items-start gap-4 mb-5">
        <div className="w-9 h-9 bg-violet-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon size={16} className="text-violet-600 dark:text-violet-400" />
        </div>
        <div>
          <h2 className="text-gray-900 dark:text-white font-semibold">{title}</h2>
          <p className="text-gray-500 dark:text-slate-400 text-xs mt-0.5">{description}</p>
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-gray-500 dark:text-slate-400 text-xs block mb-1.5">{label}</label>
      {children}
    </div>
  )
}

function Toggle({ label, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between py-1">
      <div>
        <p className="text-gray-900 dark:text-white text-sm font-medium">{label}</p>
        {description && <p className="text-gray-500 dark:text-slate-400 text-xs mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-5 rounded-full transition-colors flex-shrink-0 ${checked ? 'bg-violet-600' : 'bg-gray-200 dark:bg-slate-600'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  )
}

const inputCls = 'w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-violet-500 placeholder-gray-400 dark:placeholder-slate-600'
const selectCls = 'w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-violet-500'

export default function Settings() {
  const { isDark, toggle } = useTheme()

  const [firm, setFirm] = useState({
    name: 'Chen, Miller & Thompson LLP',
    address: '350 Fifth Avenue, Suite 4100',
    city: 'New York',
    state: 'NY',
    zip: '10118',
    phone: '(212) 555-0100',
    email: 'info@cmtlaw.com',
  })

  const [notifications, setNotifications] = useState({
    deadlineReminders: true,
    newCaseAlerts: true,
    billingOverdue: true,
    weeklyDigest: false,
    clientMessages: true,
  })

  const [billing, setBilling] = useState({
    defaultRate: '400',
    currency: 'USD',
    invoicePrefix: 'INV',
    paymentTerms: '30',
    taxRate: '0',
  })

  const [profile, setProfile] = useState({
    name: 'Sarah Chen',
    role: 'Senior Attorney',
    email: 'sarah.chen@cmtlaw.com',
    barNumber: 'NY-4421873',
    timezone: 'America/New_York',
  })

  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">Manage your preferences and firm configuration</p>
      </div>

      <div className="space-y-5">

        {/* Appearance */}
        <Section icon={Sun} title="Appearance" description="Customize how LexCore looks">
          <div className="flex items-center justify-between py-1">
            <div>
              <p className="text-gray-900 dark:text-white text-sm font-medium">Theme</p>
              <p className="text-gray-500 dark:text-slate-400 text-xs mt-0.5">Switch between dark and light mode</p>
            </div>
            <button
              onClick={toggle}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-white hover:bg-slate-800'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {isDark ? <Moon size={14} /> : <Sun size={14} />}
              {isDark ? 'Dark mode' : 'Light mode'}
            </button>
          </div>
          <div className="pt-1">
            <Field label="Language">
              <select className={selectCls} defaultValue="en-US">
                <option value="en-US">English (US)</option>
                <option value="en-GB">English (UK)</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </Field>
          </div>
        </Section>

        {/* User Profile */}
        <Section icon={User} title="User Profile" description="Your personal information and credentials">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Full Name">
              <input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Role / Title">
              <input value={profile.role} onChange={e => setProfile({ ...profile, role: e.target.value })} className={inputCls} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Email">
              <input type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Bar Number">
              <input value={profile.barNumber} onChange={e => setProfile({ ...profile, barNumber: e.target.value })} className={inputCls} />
            </Field>
          </div>
          <Field label="Timezone">
            <select value={profile.timezone} onChange={e => setProfile({ ...profile, timezone: e.target.value })} className={selectCls}>
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
            </select>
          </Field>
        </Section>

        {/* Firm Information */}
        <Section icon={Building2} title="Firm Information" description="Your firm's contact and address details">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <Field label="Firm Name">
                <input value={firm.name} onChange={e => setFirm({ ...firm, name: e.target.value })} className={inputCls} />
              </Field>
            </div>
            <div className="col-span-2">
              <Field label="Street Address">
                <input value={firm.address} onChange={e => setFirm({ ...firm, address: e.target.value })} className={inputCls} />
              </Field>
            </div>
            <Field label="City">
              <input value={firm.city} onChange={e => setFirm({ ...firm, city: e.target.value })} className={inputCls} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="State">
                <input value={firm.state} onChange={e => setFirm({ ...firm, state: e.target.value })} className={inputCls} />
              </Field>
              <Field label="ZIP">
                <input value={firm.zip} onChange={e => setFirm({ ...firm, zip: e.target.value })} className={inputCls} />
              </Field>
            </div>
            <Field label="Phone">
              <input value={firm.phone} onChange={e => setFirm({ ...firm, phone: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Email">
              <input type="email" value={firm.email} onChange={e => setFirm({ ...firm, email: e.target.value })} className={inputCls} />
            </Field>
          </div>
        </Section>

        {/* Billing Preferences */}
        <Section icon={DollarSign} title="Billing Preferences" description="Default rates and invoice configuration">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Default Hourly Rate ($)">
              <input type="number" value={billing.defaultRate} onChange={e => setBilling({ ...billing, defaultRate: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Currency">
              <select value={billing.currency} onChange={e => setBilling({ ...billing, currency: e.target.value })} className={selectCls}>
                <option>USD</option>
                <option>CAD</option>
                <option>GBP</option>
                <option>EUR</option>
              </select>
            </Field>
            <Field label="Invoice Prefix">
              <input value={billing.invoicePrefix} onChange={e => setBilling({ ...billing, invoicePrefix: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Payment Terms (days)">
              <input type="number" value={billing.paymentTerms} onChange={e => setBilling({ ...billing, paymentTerms: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Tax Rate (%)">
              <input type="number" step="0.1" value={billing.taxRate} onChange={e => setBilling({ ...billing, taxRate: e.target.value })} className={inputCls} />
            </Field>
          </div>
        </Section>

        {/* Notifications */}
        <Section icon={Bell} title="Notifications" description="Control which alerts and reminders you receive">
          <Toggle
            label="Deadline Reminders"
            description="Get notified 48 hours before case deadlines"
            checked={notifications.deadlineReminders}
            onChange={v => setNotifications({ ...notifications, deadlineReminders: v })}
          />
          <Toggle
            label="New Case Alerts"
            description="Notify when a new case is assigned to you"
            checked={notifications.newCaseAlerts}
            onChange={v => setNotifications({ ...notifications, newCaseAlerts: v })}
          />
          <Toggle
            label="Overdue Billing Alerts"
            description="Alert when a billing entry becomes overdue"
            checked={notifications.billingOverdue}
            onChange={v => setNotifications({ ...notifications, billingOverdue: v })}
          />
          <Toggle
            label="Client Messages"
            description="Notify on new client correspondence"
            checked={notifications.clientMessages}
            onChange={v => setNotifications({ ...notifications, clientMessages: v })}
          />
          <Toggle
            label="Weekly Digest"
            description="Receive a weekly summary every Monday morning"
            checked={notifications.weeklyDigest}
            onChange={v => setNotifications({ ...notifications, weeklyDigest: v })}
          />
        </Section>

        {/* Security */}
        <Section icon={Shield} title="Security" description="Account security and access settings">
          <Toggle
            label="Two-Factor Authentication"
            description="Require a verification code at login"
            checked={true}
            onChange={() => {}}
          />
          <Toggle
            label="Session Timeout"
            description="Automatically log out after 30 minutes of inactivity"
            checked={false}
            onChange={() => {}}
          />
          <div className="pt-1">
            <Field label="Session Duration">
              <select className={selectCls} defaultValue="30">
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="480">8 hours</option>
              </select>
            </Field>
          </div>
        </Section>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition ${
              saved
                ? 'bg-emerald-600 text-white'
                : 'bg-violet-600 hover:bg-violet-500 text-white'
            }`}
          >
            <Save size={14} />
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>

      </div>
    </div>
  )
}
