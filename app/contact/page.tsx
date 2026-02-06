export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-semibold">Contact Us</h1>
      <p className="mt-2 text-zinc-600">Have questions? We&apos;d love to hear from you.</p>

      <form className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold">Name</label>
          <input type="text" className="mt-1 w-full rounded border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-semibold">Email</label>
          <input type="email" className="mt-1 w-full rounded border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-semibold">Message</label>
          <textarea rows={5} className="mt-1 w-full rounded border px-3 py-2"></textarea>
        </div>
        <button className="rounded bg-black px-4 py-2 text-white">Send Message</button>
      </form>

      <div className="mt-8 space-y-4 border-t pt-6 text-sm text-zinc-600">
        <div>
          <strong>Email:</strong> support@myshop.com
        </div>
        <div>
          <strong>Phone:</strong> 1-800-MYSHOP-1
        </div>
        <div>
          <strong>Hours:</strong> Monday to Friday, 9am - 6pm EST
        </div>
      </div>
    </div>
  );
}
