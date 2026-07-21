// Job-site photos that aren't full write-ups — the Instagram feed, essentially.
// They live alongside the MDX projects on /portfolio so every build we've shot
// has a home on the site (and an indexable, described image).
//
// Filenames are the original Instagram shortcodes; they're opaque on purpose so
// re-syncing the feed never renames a file that's already been crawled.

export type FieldPhoto = {
  src: string;
  alt: string;
  caption: string;
};

const DIR = "/images/ig-projects";

export const FIELD_PHOTOS: FieldPhoto[] = [
  {
    src: `${DIR}/DCmitmExx_J.jpg`,
    alt: "Two-story composite deck with black aluminum railing and cedar posts over a covered lower patio",
    caption: "Elevated composite deck over a covered patio",
  },
  {
    src: `${DIR}/DOoI5qojUz4.jpg`,
    alt: "Composite deck with black metal railing overlooking open prairie, furnished with a fire table and Adirondack chairs",
    caption: "Prairie-view deck, built for the long evenings",
  },
  {
    src: `${DIR}/DBMOHwgv_RZ.jpg`,
    alt: "Gray composite deck and matching stair run with black aluminum railing off the back of a two-story home",
    caption: "Second-story deck with a full stair run to grade",
  },
  {
    src: `${DIR}/DOoJceLDQYc.jpg`,
    alt: "Wraparound composite deck under a white patio cover with timber posts and a dining set",
    caption: "Patio cover and deck, wrapped around the corner",
  },
  {
    src: `${DIR}/DHmQ4U1yF4Z.jpg`,
    alt: "Two-story deck on cedar posts with black railing and a covered patio underneath",
    caption: "Cedar posts, composite decking, dry space below",
  },
  {
    src: `${DIR}/DJrtUBHx2xu.jpg`,
    alt: "Attached patio cover with a metal roof and stained timber posts shading a concrete patio",
    caption: "Patio cover that reads like it came with the house",
  },
  {
    src: `${DIR}/DHoloQJy_43.jpg`,
    alt: "Upper deck with a louvered pergola and black railing above a covered patio with a tongue-and-groove ceiling",
    caption: "Deck, pergola, and a finished ceiling below",
  },
  {
    src: `${DIR}/DIki8GeNvfa.jpg`,
    alt: "Elevated deck off a brick home with dark composite decking, black railing, and stairs to a stamped concrete patio",
    caption: "Stairs down to the stamped patio",
  },
  {
    src: `${DIR}/DPTghzQjWuP.jpg`,
    alt: "Long composite deck with black railing wrapping a cedar-sided mountain home in the pines",
    caption: "Foothills wraparound — the neighbors stopped by",
  },
  {
    src: `${DIR}/DOoH-0IjYG4.jpg`,
    alt: "Low composite deck with black aluminum railing and wide stairs beside a stone-front home",
    caption: "Low deck, wide stairs, clean edges",
  },
  {
    src: `${DIR}/DHWUOB_SXz7.jpg`,
    alt: "Raised deck on cedar posts with black railing and stairs, over a covered concrete patio",
    caption: "Framed, decked, and railed off the walkout",
  },
  {
    src: `${DIR}/DIAidxYNYjq.jpg`,
    alt: "Three-story composite deck and stair run with black railing on a white two-story home",
    caption: "Two levels of deck, one long stair run",
  },
  {
    src: `${DIR}/DJoiL6ptd-q.jpg`,
    alt: "Angled ground-level composite deck with black railing and a separate landing pad on a green lawn",
    caption: "Angled deck with a detached landing",
  },
  {
    src: `${DIR}/DOoGqHjDdhl.jpg`,
    alt: "Second-story deck with black railing carried on brick columns above a covered patio",
    caption: "New deck framing tied into existing brick columns",
  },
  {
    src: `${DIR}/DPnmGNSDXUl.jpg`,
    alt: "Ground-level composite deck with black railing and a covered section with a standing-seam metal roof",
    caption: "Half open, half covered",
  },
  {
    src: `${DIR}/DC4ThdvRuSi.jpg`,
    alt: "Covered front porch deck with cedar posts, black railing, and stairs on a mountain-style home",
    caption: "Covered porch with cedar posts",
  },
  {
    src: `${DIR}/DBZiw6OyB78.jpg`,
    alt: "Composite front entry stairs with black railing between stone columns on a stucco home",
    caption: "Front entry stairs in composite",
  },
  {
    src: `${DIR}/DOoIeFgDUs1.jpg`,
    alt: "Covered front porch with gray composite decking and white railing on a blue home",
    caption: "White railing, gray boards, covered porch",
  },
  {
    src: `${DIR}/DOoHQymDXCr.jpg`,
    alt: "Narrow composite porch deck with black aluminum railing running along a green two-story home",
    caption: "Porch run along the front of the house",
  },
  {
    src: `${DIR}/DHv1tDvxOl8.jpg`,
    alt: "Black aluminum railing with a composite top cap installed on a stone-columned concrete front porch",
    caption: "Railing retrofit on an existing porch",
  },
  {
    src: `${DIR}/DQuy46oDcKW_newtab.jpg`,
    alt: "Composite deck with black aluminum railing and steps off the back of a cream-sided home",
    caption: "Back-door deck with a center step-down",
  },
  {
    src: `${DIR}/DWPp41GFQdI.jpg`,
    alt: "Wide brown composite deck surface with black aluminum railing looking out over a fenced backyard",
    caption: "Deck day one — nothing on it yet",
  },
  {
    src: `${DIR}/DHT07lwyRhF.jpg`,
    alt: "Ground-level composite deck built around a mature tree with black aluminum railing",
    caption: "Framed around the tree, not through it",
  },
  {
    src: `${DIR}/DWWT_EUlZ3Z_1.jpg`,
    alt: "Elevated deck with black railing and stairs on a brick home, framing complete over a lower patio",
    caption: "Elevated deck off a brick two-story",
  },
  {
    src: `${DIR}/DIL2NGLx_oS.jpg`,
    alt: "Scaffolding set up under a three-story deck mid-rebuild on a snowy day",
    caption: "Scaffolding up, snow falling, work continues",
  },
  {
    src: `${DIR}/DA_IZmKRCwR.jpg`,
    alt: "Weathered pressure-treated wood deck with split, cupped boards before demolition",
    caption: "Before: the deck that earned its replacement",
  },
];
