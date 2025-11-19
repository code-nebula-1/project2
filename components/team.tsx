"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Mail, User2 } from "lucide-react";
import { useState } from "react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  contact: string;
  blurb: string;
  image: string;
}

export function Team() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const members: TeamMember[] = [
    {
      id: 1,
      name: "Dr. Samantha Reig",
      role: "Assistant Professor, Miner School of Computer & Information Sciences",
      contact: "Sam_Reig@uml.edu",
      blurb: "Samantha Reig is a human-computer interaction (HCI) and human-robot interaction (HRI) researcher. Her research areas include human-autonomy trust, socially complex human-robot interaction, and personalized experiences with AI agents in services. Her areas of expertise include multi-embodiment interactions, social robotics, and experimental design. She received her Ph.D. in HCI from the Human-Computer Interaction Institute at Carnegie Mellon University in 2023 and her undergraduate degree from Cornell University. If she had to describe her interests in emoji, here's what she'd say: 🤖💻😺🍜🗺️🌄🌲🥾🎶🎭📚",
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
      blurb: "After my master's in Human-Computer Interaction from the University of Maryland, I joined UML in 2025 as a PhD student. My research interests lie in understanding technological access barriers faced by older adults and the context within which social robots can support healthy aging. Advised by Prof. Reig, I work at the PIERS Lab.",
      image: "/Photos/Headshots/Haritha_Piers_Pic.jpg"
    },
    {
      id: 5,
      name: "Jasmin Marwad",
      role: "PhD Student at UML, Miner School of Computer & Information Sciences",
      contact: "Jasmin_Marwad@uml.edu",
      blurb: "Jasmin Marwad is a Ph.D. student at the University of Massachusetts Lowell, advised by Dr. Reig in the PIERS Lab. Her research centers on human-robot and human-computer interaction, focusing on how robotics and virtual learning can be integrated to create accessible and effective educational experiences. She holds an M.S. in Computer Science ('24), B.S. in Computer Science ('23), and B.S.E. in Electrical Engineering ('23) from UMass Lowell.",
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
      blurb: "Quynh is a junior in the College of Fine Arts, Humanities, and Social Sciences (FAHSS) at UMass Lowell, pursuing a degree in Psychology. She joined the lab in Fall 2025 through RHSA's Road to Research program, advised by Prof Reig. Her research interests include behavioral and emotional regulation.",
      image: "/Photos/Headshots/Quynh_Headshot.jpg"
    },
    {
      id: 9,
      name: "Dylan Tilton",
      role: "Undergraduate Mechanical Engineering student at UML",
      contact: "dylan_tilton@student.uml.edu",
      blurb: "Dylan is a Junior in the Francis College of Engineering at UML. He joined professor Sam Reig's Human-Computer Interaction lab in 2024. He started off with a remote control tech support project called the PointAid, which used a frame with a remote controlled camera and laser pointer set up to allow a user to provide a level of physicality to a traditionally verbal form of tech support. Currently, he's working with Anaya on the HRI Task Repository website. They've gone through the last 5 years of HRI papers and recorded their experiment tasks to sort into a database with the end goal of building a website that can be used by researchers to find specific and appropriate tasks for their study.",
      image: "/placeholder-user.jpg"
    },
    {
      id: 10,
      name: "Isabel Lavoie",
      role: "Undergraduate Computer Science student at UML",
      contact: "isabel_lavoie@student.uml.edu",
      blurb: "Isabel is a Junior in the Kennedy College of Sciences at UML. She joined Professor Reig's lab in the fall of 2024 as part of the Immersive Scholars program. She started with on animations for a prototype for an AI Tech Support Agent that could help older adults with everyday computer tasks. One of the main interests in her research is the level of trust a human will express when interacting with a computer. With the help of Kiara Ventura, they were able to create 20 voiced animations, those of which were used in interviews given out to older adults and their caretakers. ",
      image: "/Photos/Headshots/Isabel_Lavoie.jpeg"
    }
  ];

  // Group members by category
  const facultyAdvisors = members.filter(m => m.role.includes("Professor"));
  const phdStudents = members.filter(m => m.role.includes("PhD"));
  const undergraduates = members.filter(m => m.role.includes("Undergraduate"));

  const renderMemberCard = (member: TeamMember) => (
    <Dialog key={member.id}>
      <DialogTrigger asChild>
        <Card
          className=" py-0 group overflow-hidden hover:shadow-xl transition-all duration-500 border-border/50 bg-card/80 backdrop-blur cursor-pointer hover:scale-[1.02] hover:border-primary/30"
          onClick={() => setSelectedMember(member)}
        >
          <CardContent className="p-0 h-full">
            <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-muted/50 to-muted">
              <Image
                src={member.image}
                alt={member.name}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Name and Role Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white transform translate-y-0 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-1 leading-tight">
                  {member.name}
                </h3>
                <p className="text-sm text-white/90 line-clamp-2 leading-snug">
                  {member.role}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <User2 className="w-3.5 h-3.5" />
                  <span>Click to view profile</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative w-full md:w-48 h-64 md:h-64 rounded-lg overflow-hidden bg-gradient-to-br from-muted/50 to-muted flex-shrink-0">
              <Image
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
                width={300}
                height={400}
              />
            </div>
            <div className="flex-1 space-y-2">
              <DialogTitle className="text-2xl font-bold">
                {member.name}
              </DialogTitle>
              <DialogDescription className="text-base text-foreground/70">
                {member.role}
              </DialogDescription>
              <div className="pt-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a
                  href={`mailto:${member.contact}`}
                  className="text-sm text-primary hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {member.contact}
                </a>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-3">Biography</h4>
          <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
            {member.blurb}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <section className="relative py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
            Meet the Team
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Our diverse team of researchers, faculty, and students working at the intersection of human-computer interaction and robotics.
          </p>
        </div>

        {/* Faculty Advisors Section */}
        {facultyAdvisors.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-foreground/90 border-l-4 border-primary pl-4">
              Faculty Advisors
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {facultyAdvisors.map(renderMemberCard)}
            </div>
          </div>
        )}

        {/* PhD Students Section */}
        {phdStudents.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-foreground/90 border-l-4 border-primary pl-4">
              PhD Students
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {phdStudents.map(renderMemberCard)}
            </div>
          </div>
        )}

        {/* Undergraduate Students Section */}
        {undergraduates.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-8 text-foreground/90 border-l-4 border-primary pl-4">
              Undergraduate Researchers
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {undergraduates.map(renderMemberCard)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
