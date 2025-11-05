import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Mail } from "lucide-react";

export function Team() {
  const members = [
    {
        id: 1,
        name: "Dr. Samantha Reig",
        role: "Assistant Professor, Miner School of Computer & Information Sciences",
        contact: "Sam_Reig@uml.edu",
        blurb: "Samantha Reig is a human-computer interaction (HCI) and human-robot interaction (HRI) researcher. Her research areas include human-autonomy trust, socially complex human-robot interaction, and personalized experiences with AI agents in services. Her areas of expertise include multi-embodiment interactions, social robotics, and experimental design. She received her Ph.D. in HCI from the Human-Computer Interaction Institute at Carnegie Mellon University in 2023 and her undergraduate degree from Cornell University. If she had to describe her interests in emoji, here’s what she’d say: 🤖💻😺🍜🗺️🌄🌲🥾🎶🎭📚",
        image: "/Photos/Headshots/sam-headshot.png"
    },
    {
        id: 2,
        name: "Mark de Bruijn",
        role: "PhD Student at UML, Miner School of Computer & Information Sciences",
        contact: "MarkCornelis_deBruijn@uml.edu",
        blurb: "After completing his MSc in Artificial Intelligence at Vrije Universiteit Amsterdam, Mark is currently a PhD student at the ARA Lab under Prof. M. Cabrera since 2024. He worked together with Prof. S. Reig and Prof. M. Cabrera on proxemics and task engagement as part of a directed study. His interests lie in Human-Robot Collaboration (HRC), Social Robots, and designing useful robots for humans. In his spare time, he likes to listen to music and drive around in his Miata.",
        image: "/Photos/Headshots/Mark_Headshot.jpg"
    },
    {
        id: 3,
        name: "Timofey Fayzullin",
        role: "PhD Student at UML, Miner School of Computer & Information Sciences",
        contact: "timofey_fayzullin@student.uml.edu",
        blurb: "I am a computer science PhD student in the Rich Miner School of Computer and Information Sciences at University of Massachusetts Lowell. I have finished bachelor's and master's degrees in computer science at UMASS Lowell. On my research project I work with Professor Cabrera and Professor Reig at the ARA & PIERS labs. Currently I am working to evaluate user comfort towards the robot across various commands and tasks. My general research interests lie in developing a voice control interface for mobile home assistive robots for older adults capable of completing various physical and cognitive assistive tasks. With my research, I hope to be able to make a difference in the field of household assistive technology and provide an independent living lifestyle to those who may be lacking it.",
        image: "/Photos/Headshots/Timofey_Fayzullin.jpg"
    },
    {
        id: 4,
        name: "Haritha Malladi",
        role: "PhD Student at UML, Miner School of Computer & Information Sciences",
        contact: "haritha_malladi@uml.edu",
        blurb: "After my master’s in Human-Computer Interaction from the University of Maryland, I joined UML in 2025 as a PhD student. My research interests lie in understanding technological access barriers faced by older adults and the context within which social robots can support healthy aging. Advised by Prof. Reig, I work at the PIERS Lab.",
        image: "/Photos/Headshots/Haritha_Piers_Pic.jpg"
    },
    {
        id: 5,
        name: "Jasmin Marwad",
        role: "PhD Student at UML, Miner School of Computer & Information Sciences",
        contact: "Jasmin_Marwad@uml.edu",
        blurb: "Jasmin Marwad is a Ph.D. student at the University of Massachusetts Lowell, advised by Dr. Reig in the PIERS Lab. Her research centers on human-robot and human-computer interaction, focusing on how robotics and virtual learning can be integrated to create accessible and effective educational experiences. She holds an M.S. in Computer Science (’24), B.S. in Computer Science (’23), and B.S.E. in Electrical Engineering (’23) from UMass Lowell.",
        image: "/Photos/Headshots/Jasmin_pic.jpg"
    },
    {
        id: 6,
        name: "Alexander Nunes",
        role: "Undergraduate Computer Science student at UML",
        contact: "Alexander_nunes@student.uml.edu",
        blurb: "Alex is a junior undergraduate student researcher working towards a Computer Science degree with a minor in Robotics. He has been working with Prof. Reig in the PEIRS lab since September of 2024. While he loves to learn about robots in general, he takes a special interest in finding ways that robots and humans can work together to make life the best that it can be. He also likes to work with multi-agent systems and autonomy when he can.",
        image: "/Photos/Headshots/Alex_Nunes.jpg"
    },
    {
        id: 7,
        name: "Aanya Bharti",
        role: "Undergraduate Computer Science student at UML",
        contact: "Aanya_bharti@student.uml.edu",
        blurb: "Aanya Bharti is an undergraduate student majoring in Computer Science with a minor in Mathematics at the University of Massachusetts Lowell. She began working with Professor Samantha Reig in the PIERS Lab in Summer 2025 and continues to contribute to the Human-Robot Interaction (HRI) Task Repository project. Her research interests include human-computer interaction, user experience design, and the social and psychological aspects of HRI. She is especially interested in understanding how people interact with technology and how thoughtful design can make those experiences more intuitive and human-centered.",
        image: "/Photos/Headshots/Aanya_Bharti.jpeg"
    },
    {
        id: 8,
        name: "Quynh Pham",
        role: "Undergraduate Student via Roads to Research",
        contact: "quynh_pham1@student.uml.edu",
        blurb: "Quynh is a junior in the College of Fine Arts, Humanities, and Social Sciences (FAHSS) at UMass Lowell, pursuing a degree in Psychology. She joined the lab in Fall 2025 through RHSA’s Road to Research program, advised by Prof Reig. Her research interests include behavioral and emotional regulation.",
        image: "/Photos/Headshots/Quynh_Headshot.jpg"
    },
    {
        id: 9,
        name: "Dylan Tilton",
        role: "Undergraduate Mechanical Engineering student at UML",
        contact: "dylan_tilton@student.uml.edu",
        blurb: "Dylan is a Junior in the Francis College of Engineering at UML. He joined professor Sam Reig’s Human-Computer Interaction lab in 2024. He started off with a remote control tech support project called the PointAid, which used a frame with a remote controlled camera and laser pointer set up to allow a user to provide a level of physicality to a traditionally verbal form of tech support. Currently, he’s working with Anaya on the HRI Task Repository website. They’ve gone through the last 5 years of HRI papers and recorded their experiment tasks to sort into a database with the end goal of building a website that can be used by researchers to find specific and appropriate tasks for their study.",
        image: "/placeholder-user.jpg"
    },
    {
        id: 10,
        name: "Isabel Lavoie",
        role: "Undergraduate Computer Science student at UML",
        contact: "isabel_lavoie@student.uml.edu",
        blurb: "Isabel is a Junior in the Kennedy College of Sciences at UML. She joined Professor Reig’s lab in the fall of 2024 as part of the Immersive Scholars program. She started with on animations for a prototype for an AI Tech Support Agent that could help older adults with everyday computer tasks. One of the main interests in her research is the level of trust a human will express when interacting with a computer. With the help of Kiara Ventura, they were able to create 20 voiced animations, those of which were used in interviews given out to older adults and their caretakers. ",
        image: "/Photos/Headshots/Isabel_Lavoie.jpeg"
    }
  ];

  return (
    <section className="relative py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Meet the Team
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, index) => (
              <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border bg-card hover:bg-card/80">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="aspect-[4/5] overflow-hidden">
                      <Image
                        src={member.image}
                        alt={`${member.name} - ${member.role}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        width={400}
                        height={500}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-2xl font-semibold">
                        {member.name}
                      </h3>
                      <p className="text-lg opacity-90">{member.role}</p>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-4 h-4 text-primary" />
                        <a
                          href={`mailto:${member.contact}`}
                          className="text-sm text-primary hover:underline transition-colors"
                        >
                          {member.contact}
                        </a>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-foreground/60">
                        <span className="font-medium">Bio:</span>{" "}
                        {member.blurb}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
