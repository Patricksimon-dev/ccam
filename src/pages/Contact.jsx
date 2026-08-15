import ContactForm from '../components/ContactForm'
import PageHeader from '../components/PageHeader'

export default function Contact() {
  return (
    <div className="page">
      <PageHeader
        title="Contact"
        subtitle="We’d love to hear from you. Send a message and let us know how we can support you."
      />
      <ContactForm />
    </div>
  )
}
