// Raw MCP `get_design_context` output for node 1:9562 (Our Centers section).
// Preserved verbatim so the component-builder stage can adapt to React/Tailwind/shadcn.

const imgArrowUp2 = "https://www.figma.com/api/mcp/asset/ec0ce103-94c1-4a55-b013-2f38b7c5c8a0";
const imgGroup1171281692 = "https://www.figma.com/api/mcp/asset/f8886f48-31ec-491a-8209-949bbc6876e0";
const imgRectangle161124062 = "https://www.figma.com/api/mcp/asset/a008a2db-ab54-4424-85ed-c873e664be42";

function Group1171281731({ className }: { className?: string }) {
  return (
    <div className={className || "h-[56px] relative w-[1300px]"} data-node-id="1:730">
      <div className="absolute content-stretch flex gap-[80px] inset-[0_-12.08%_0_0] items-center" data-node-id="1:731">
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="1:732">
          <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-node-id="1:733">
            <div className="[word-break:break-word] col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1 text-black whitespace-nowrap" data-node-id="1:734">
              <a className="col-1 cursor-pointer flex flex-col font-['Fraunces:Italic',sans-serif] font-normal italic justify-center ml-0 mt-0 relative row-1 text-[32px] tracking-[-0.3551px]" data-node-id="1:735" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
                <p className="leading-[55.044px]">Bodhi</p>
              </a>
              <div className="col-1 flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center ml-px mt-[46.5px] opacity-60 relative row-1 text-[12px] tracking-[2.9562px] uppercase" data-node-id="1:736">
                <p className="leading-[20.766px]">School of yoga</p>
              </div>
            </div>
          </div>
        </div>
        {/* Nav items: Teacher Courses, Advanced Certifications, Yoga Courses, Workshops, Our Centers, About Us
            Right side: avatar/icon image (imgGroup1171281692) + CTA "Enquire Now" bg #8ee0ce, text #1d3e59, radius 36 */}
      </div>
    </div>
  );
}

export default function OurCenters() {
  return (
    <div className="relative size-full" data-node-id="1:9562" style={{ backgroundImage: "linear-gradient(90deg, rgb(250, 250, 250) 0%, rgb(250, 250, 250) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Our Centers">
      {/* See _workspace/01_figma_context_node-1-9562.json for the full structural+style breakdown.
         The MCP returned a fully expanded JSX tree; structural data captured in the JSON sibling. */}
      <div className="absolute content-stretch flex flex-col gap-[52px] h-[1039px] items-start leading-[0] left-[195px] top-[150px] w-[1531px]" data-node-id="1:9563">
        {/* Our Centers heading 45px bold + subtext 17px DM_Sans rgba(90,90,90,0.72) */}
        {/* Pincode bar: 1531x72 backdrop-blur-30.1 bg-rgba(255,255,255,0.82) border #e4e4e4 rounded-18 */}
        {/* Locations panel: 1531x910 backdrop-blur-30.1 same border rounded-36 — left list 11 items DM_Sans 19 #4c4c4c + right map image 1123x910 (imgRectangle161124062) */}
      </div>
      <Group1171281731 className="-translate-x-1/2 absolute h-[56px] left-1/2 top-[20px] w-[1416px]" />
      <div className="absolute bottom-0 contents left-0" data-node-id="1:9588">
        <div className="absolute bg-[#e5fff9] bottom-0 h-[1302px] left-0 w-[1920px]" data-node-id="1:9589" />
        {/* "Begin where you are." heading 108px Host_Grotesk, italic accent in #10aa88
            Primary CTA "Try a class, free" bg #27af91 white text rounded-999
            3 cards 431x220 bg-white border rgba(126,126,126,0.18) rounded-34 — titles: Free Trial Session / Speak to us / Take a Guided Path
            Card CTA bg #c7fef2 text #004b3b rounded-42 (Join now / Contact us / Start now)
            Site footer 4 columns (Bodhi, School, Visit, Stay close) + bottom border row */}
      </div>
    </div>
  );
}
