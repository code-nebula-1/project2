import { Mail, MapPin, Microscope } from "lucide-react"

export function Contact() {
  return (
    <section className="relative py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Join Our Team</h2>
          <p className="text-lg text-foreground/70 text-pretty">
            We're always looking for talented researchers and collaborators
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6">
            <Mail className="w-8 h-8 mx-auto mb-3 text-primary" />
            <h3 className="font-bold mb-2">Email</h3>
            <p className="text-sm text-foreground/70">uml.piers.lab@gmail.com</p>
          </div>
          <div className="text-center p-6">
            <MapPin className="w-8 h-8 mx-auto mb-3 text-primary" />
            <h3 className="font-bold mb-2">Location</h3>
            <p className="text-sm text-foreground/70">Southwick 304</p>
          </div>
          <div className="text-center p-6">
            <Microscope className="w-8 h-8 mx-auto mb-3 text-primary" />
            <h3 className="font-bold mb-2">Opportunities</h3>
            <p className="text-sm text-foreground/70">PhD & Postdoc Positions</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
            Apply Now
          </button>
          <button className="px-8 py-4 rounded-lg border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}
