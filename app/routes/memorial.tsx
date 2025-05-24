export default function memorial() {
  return (
    <section className="flex flex-col items-center pt-8">
      <article className="flex flex-col gap-8 w-7xl text-lg bg-slate-50 rounded-md p-8 shadow-md">
        <h2 className="font-ephesis text-7xl font-extrabold py-12 self-center">
          Carol's Memorial Fund
        </h2>
        {/* TODO: Add text */}
        <p>
          Description about fund. Lorem ipsum dolor sit amet consectetur
          adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem
          placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu
          aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec
          metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer
          nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad
          litora torquent per conubia nostra inceptos himenaeos.
        </p>
        {/* TODO: Figure out how to set up donations to our own fund. GOFUNDME has options*/}
        <h3 className="text-center text-3xl font-bold">$13,000</h3>
        <p className="text-center text-2xl">Contributed so far by 12 people</p>
      </article>
    </section>
  )
}
