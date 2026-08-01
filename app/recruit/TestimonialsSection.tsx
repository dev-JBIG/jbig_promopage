import Image from "next/image";
import { testimonialItems, type TestimonialItem } from "./content";

function TestimonialStory({ testimonial, index }: { testimonial: TestimonialItem; index: number }) {
  return (
    <article className="testimonial-story">
      <span className="testimonial-story-number">{String(index + 1).padStart(2, "0")}</span>

      <div className="testimonial-author">
        {testimonial.profileImage ? (
          <Image
            className="testimonial-profile-image"
            src={testimonial.profileImage}
            alt={`${testimonial.name} 프로필`}
            width={120}
            height={150}
          />
        ) : null}
        <div className="testimonial-author-information">
          <strong>{testimonial.name}</strong>
          <span>{testimonial.cohort}</span>
          <span>{testimonial.mainActivity}</span>
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
            <h2>배운 것은,<br />어디까지 이어졌을까요.</h2>
          </div>
          <p>수료자들이 직접 들려주는<br />JBIG 이후의 변화.</p>
        </header>

        <div className="testimonial-list" aria-label="JBIG 동아리원 후기">
          {testimonialItems.map((testimonial, index) => (
            <TestimonialStory key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
