import Image from "next/image";
import { testimonialItems, testimonialsContent, type TestimonialItem } from "./content";

function TestimonialStory({ testimonial, index }: { testimonial: TestimonialItem; index: number }) {
  return (
    <article className="testimonial-story">
      <span className="testimonial-story-number">{String(index + 1).padStart(2, "0")}</span>

      <div className="testimonial-author">
        {testimonial.profileImage ? (
          <Image
            className="testimonial-profile-image"
            src={testimonial.profileImage}
            alt={`${testimonial.name} ${testimonialsContent.profileAltSuffix}`}
            width={120}
            height={150}
          />
        ) : null}
        <div className="testimonial-author-information">
          <strong>{testimonial.name}</strong>
          <span>{testimonial.department}</span>
          <span>{testimonial.cohort}</span>
        </div>
      </div>

      <div className="testimonial-story-copy">
        <blockquote>“{testimonial.highlight}”</blockquote>
        <p>{testimonial.review}</p>
      </div>
    </article>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section" id="testimonials" data-recruit-section="testimonials">
      <div className="recruit-section testimonials-inner">
        <header className="testimonial-heading">
          <div>
            <h2>{testimonialsContent.heading[0]}<br />{testimonialsContent.heading[1]}</h2>
          </div>
          <p>{testimonialsContent.description[0]}<br />{testimonialsContent.description[1]}</p>
        </header>

        <div className="testimonial-list" aria-label={testimonialsContent.listAriaLabel}>
          {testimonialItems.map((testimonial, index) => (
            <TestimonialStory key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
