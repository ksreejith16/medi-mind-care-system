
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    content: "MediMind's health prediction feature helped me identify early signs of high blood pressure. The personalized recommendations were invaluable.",
    author: "Sarah Johnson",
    role: "Marketing Executive",
  },
  {
    id: 2,
    content: "The nutrition recommendations are surprisingly accurate. I've been following the suggestions for a month and feel much better already!",
    author: "Michael Chen",
    role: "Software Engineer",
  },
  {
    id: 3,
    content: "As someone with chronic conditions, having the AI assistant available 24/7 for my questions has been a game-changer.",
    author: "Emma Thompson",
    role: "Teacher",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What Our Users Say
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Discover how MediMind is transforming healthcare experiences.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white">
              <CardContent className="pt-6">
                <div className="h-12 flex items-center justify-center mb-4">
                  <svg
                    className="h-8 w-8 text-health-500"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>
                <p className="text-lg text-gray-600 mb-4">{testimonial.content}</p>
                <div className="font-medium">
                  <p className="text-health-700">{testimonial.author}</p>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
