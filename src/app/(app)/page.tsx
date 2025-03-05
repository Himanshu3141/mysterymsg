"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/message.json";

function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-center px-6 md:px-32 py-16 bg-gray-900 text-white">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-medium text-gray-100">
            Step Into the Realm of Secret Sharing
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg text-gray-400">
            Share your thoughts and secrets anonymously on{" "}
            <span className="text-gray-300">Mystery Message</span>.
          </p>
        </section>

        {/* Messages Carousel */}
        <Carousel
          plugins={[Autoplay({ delay: 3000 })]}
          className="w-full max-w-md"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index}>
                <div className="p-2">
                  <Card className="bg-gray-800 border border-gray-700 transition-all hover:bg-gray-700">
                    <CardHeader className="text-lg font-medium text-gray-300">
                      {message.title}
                    </CardHeader>
                    <CardContent className="flex aspect-square items-center justify-center p-5">
                      <span className="text-base text-gray-400">
                        {message.content}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </main>

      {/* Footer */}
      <footer className="text-center p-4 md:p-5 bg-gray-900 text-gray-500 border-t border-gray-800">
        <p className="text-sm">© 2025 Mystery Message. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Home;