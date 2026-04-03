export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-8">
            <h1 className="text-dark fw-bold mb-4">About Beautify</h1>
            
            <section className="mb-5">
              <h2 className="text-dark fw-bold mb-3">Our Story</h2>
              <p className="text-muted mb-3">
                Founded in 2020, Beautify is dedicated to bringing premium skincare products to customers worldwide. We believe that everyone deserves access to high-quality, effective skincare solutions that work with their unique skin type.
              </p>
              <p className="text-muted mb-3">
                Our mission is to empower individuals to feel confident in their skin through carefully curated products from trusted brands around the globe. From K-beauty innovations to European skincare traditions, we bring the best of international beauty to your doorstep.
              </p>
            </section>

            <section className="mb-5">
              <h2 className="text-dark fw-bold mb-3">Our Values</h2>
              <ul className="text-muted">
                <li className="mb-2"><strong>Quality:</strong> We only stock products that meet our rigorous standards for efficacy and safety.</li>
                <li className="mb-2"><strong>Authenticity:</strong> All products are guaranteed authentic and sourced directly from official distributors.</li>
                <li className="mb-2"><strong>Sustainability:</strong> We're committed to eco-friendly practices and supporting sustainable beauty brands.</li>
                <li className="mb-2"><strong>Inclusivity:</strong> Skincare is for everyone. We offer products for all skin types and concerns.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-dark fw-bold mb-3">Why Choose Us</h2>
              <p className="text-muted">
                With Beautify, you get expert curation, competitive pricing, and reliable customer service. Our team is passionate about skincare and ready to help you find the perfect products for your needs.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
