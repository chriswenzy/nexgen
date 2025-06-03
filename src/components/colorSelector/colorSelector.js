import { useState } from "react";
import { Row, Col, Card, ButtonGroup, Button, Badge } from "react-bootstrap";

const colorFamilies = [
  { name: "Neutrals", popular: true },
  { name: "Blues", popular: false },
  { name: "Greens", popular: true },
  { name: "Warm Tones", popular: false },
  { name: "Modern Grays", popular: true },
  { name: "Vibrant Accents", popular: false },
];

const getColorFamilyBase = (family) => {
  const colors = {
    Neutrals: "#dcd6cc",
    Blues: "#4a90e2",
    Greens: "#6ab04c",
    "Warm Tones": "#e67e22",
    "Modern Grays": "#95a5a6",
    "Vibrant Accents": "#f39c12",
  };
  return colors[family] || "#ccc";
};

const getColorVariants = (baseColor) => {
  // Generate 3 variants (lighter and darker) of the base color
  return [lightenColor(baseColor, 20), baseColor, darkenColor(baseColor, 20)];
};

function lightenColor(color, percent) {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return `#${(
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  )
    .toString(16)
    .slice(1)}`;
}

function darkenColor(color, percent) {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = ((num >> 8) & 0x00ff) - amt;
  const B = (num & 0x0000ff) - amt;
  return `#${(
    0x1000000 +
    (R > 0 ? (R < 255 ? R : 255) : 0) * 0x10000 +
    (G > 0 ? (G < 255 ? G : 255) : 0) * 0x100 +
    (B > 0 ? (B < 255 ? B : 255) : 0)
  )
    .toString(16)
    .slice(1)}`;
}

const HouseColorSelector = () => {
  const [selectedPart, setSelectedPart] = useState("walls");
  const [wallColor, setWallColor] = useState("#dcd6cc");
  const [roofColor, setRoofColor] = useState("#4b4b4b");
  const [doorColor, setDoorColor] = useState("#2c3e50");
  const [savedCombinations, setSavedCombinations] = useState([]);

  const handleColorApply = (colorFamily) => {
    const color = getColorFamilyBase(colorFamily);
    switch (selectedPart) {
      case "walls":
        setWallColor(color);
        break;
      case "roof":
        setRoofColor(color);
        break;
      case "door":
        setDoorColor(color);
        break;
      case "all":
        setWallColor(color);
        setRoofColor(darkenColor(color, 30));
        setDoorColor(lightenColor(color, 10));
        break;
      default:
        break;
    }
  };

  const saveCurrentCombination = () => {
    const newCombination = {
      walls: wallColor,
      roof: roofColor,
      door: doorColor,
      id: Date.now(),
    };
    setSavedCombinations([...savedCombinations, newCombination]);
  };

  const applySavedCombination = (combo) => {
    setWallColor(combo.walls);
    setRoofColor(combo.roof);
    setDoorColor(combo.door);
  };

  return (
    <div className="text-center">
      <h3 className="mb-4">Design Your Dream Home Exterior</h3>
      <p className="lead mb-4">
        Try different color combinations and visualize your perfect home
      </p>

      <div className="mb-4 p-3 bg-light rounded">
        <h5 className="mb-3">Choose a Part of the House to Paint</h5>
        <ButtonGroup className="flex-wrap justify-content-center">
          {["all", "walls", "roof", "door"].map((part) => (
            <Button
              key={part}
              variant={selectedPart === part ? "primary" : "outline-primary"}
              onClick={() => setSelectedPart(part)}
              className="text-capitalize"
              size="md"
            >
              {part}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      <h5 className="mb-3">Select a Color Family</h5>
      <Row className="g-4 mb-5 justify-content-center">
        {colorFamilies.map(({ name, popular }, index) => {
          const baseColor = getColorFamilyBase(name);
          const variants = getColorVariants(baseColor);

          return (
            <Col key={index} xs={6} sm={4} md={3} lg={2}>
              <Card
                className="border-0 shadow-sm h-100 text-center hover-effect"
                onClick={() => handleColorApply(name)}
                style={{ cursor: "pointer", transition: "transform 0.2s" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-5px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <div className="d-flex rounded-top" style={{ height: "60px" }}>
                  {variants.map((color, i) => (
                    <div
                      key={i}
                      style={{
                        backgroundColor: color,
                        flex: 1,
                        borderLeft:
                          i > 0 ? "1px solid rgba(0,0,0,0.1)" : "none",
                      }}
                    />
                  ))}
                </div>
                <Card.Body className="p-2">
                  <h6 className="mb-0">
                    {name}
                    {popular && (
                      <Badge pill bg="success" className="ms-2">
                        Popular
                      </Badge>
                    )}
                  </h6>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      <div className="house-wrapper mx-auto mb-4" style={{ maxWidth: 400 }}>
        <svg
          viewBox="0 0 300 250"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
        >
          <defs>
            <linearGradient id="shadowGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#000" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000" stopOpacity="0.3" />
            </linearGradient>
            <pattern
              id="brickPattern"
              patternUnits="userSpaceOnUse"
              width="20"
              height="10"
            >
              <rect width="20" height="10" fill={wallColor} />
              <path
                d="M0 0 L20 0 L20 10 L0 10 Z"
                fill="none"
                stroke={darkenColor(wallColor, 15)}
                strokeWidth="1"
              />
              <path
                d="M0 5 L20 5"
                stroke={darkenColor(wallColor, 15)}
                strokeWidth="1"
              />
            </pattern>
            <pattern
              id="roofTilePattern"
              patternUnits="userSpaceOnUse"
              width="30"
              height="15"
            >
              <rect width="30" height="15" fill={roofColor} />
              <path
                d="M0 0 L30 0 L30 15 L0 15 Z"
                fill="none"
                stroke={darkenColor(roofColor, 15)}
                strokeWidth="1"
              />
              <path
                d="M0 7.5 Q15 0 30 7.5"
                stroke={darkenColor(roofColor, 15)}
                strokeWidth="1"
                fill="none"
              />
              <path
                d="M0 7.5 Q15 15 30 7.5"
                stroke={darkenColor(roofColor, 15)}
                strokeWidth="1"
                fill="none"
              />
            </pattern>
          </defs>

          {/* Roof with texture */}
          <polygon
            points="150,30 60,100 240,100"
            fill="url(#roofTilePattern)"
            stroke={darkenColor(roofColor, 20)}
            strokeWidth="2"
            style={{ transition: "fill 0.3s ease" }}
          />

          {/* Chimney with brick texture */}
          <rect
            x="185"
            y="45"
            width="15"
            height="35"
            fill={darkenColor(wallColor, 40)}
            rx="2"
            stroke={darkenColor(wallColor, 50)}
          />

          {/* House base with brick texture */}
          <rect
            x="75"
            y="100"
            width="150"
            height="100"
            rx="8"
            fill="url(#brickPattern)"
            stroke={darkenColor(wallColor, 20)}
            strokeWidth="2"
            style={{ transition: "fill 0.3s ease" }}
          />

          {/* Windows with frames */}
          <rect
            x="90"
            y="120"
            width="25"
            height="25"
            rx="2"
            fill="#ecf0f1"
            stroke="#bbb"
            strokeWidth="2"
          />
          <rect
            x="185"
            y="120"
            width="25"
            height="25"
            rx="2"
            fill="#ecf0f1"
            stroke="#bbb"
            strokeWidth="2"
          />
          <line
            x1="102.5"
            y1="120"
            x2="102.5"
            y2="145"
            stroke="#bbb"
            strokeWidth="1"
          />
          <line
            x1="197.5"
            y1="120"
            x2="197.5"
            y2="145"
            stroke="#bbb"
            strokeWidth="1"
          />

          {/* Door with details */}
          <rect
            x="135"
            y="140"
            width="30"
            height="60"
            rx="3"
            fill={doorColor}
            stroke={darkenColor(doorColor, 20)}
            strokeWidth="2"
            style={{ transition: "fill 0.3s ease" }}
          />
          <circle cx="160" cy="170" r="3" fill="#f1c40f" />
          <rect
            x="138"
            y="143"
            width="24"
            height="54"
            rx="1"
            fill="none"
            stroke={darkenColor(doorColor, 10)}
            strokeWidth="1"
            strokeDasharray="3,3"
          />

          {/* Decorative elements */}
          <rect x="80" y="110" width="5" height="5" fill={doorColor} rx="1" />
          <rect x="215" y="110" width="5" height="5" fill={doorColor} rx="1" />

          {/* Ground shadow */}
          <ellipse
            cx="150"
            cy="205"
            rx="80"
            ry="8"
            fill="url(#shadowGradient)"
          />

          {/* Front path */}
          <path
            d="M150 200 L150 220 L130 220 Q150 210 170 220 L150 220 Z"
            fill={lightenColor(wallColor, 5)}
            stroke={darkenColor(wallColor, 10)}
            strokeWidth="1"
          />
        </svg>

        <div className="mt-3 d-flex justify-content-center align-items-center">
          <strong className="me-2">Currently Painting:</strong>
          <Badge bg="info" className="text-capitalize">
            {selectedPart}
          </Badge>
        </div>
      </div>

      <div className="mb-4">
        <Button
          variant="success"
          size="md"
          onClick={saveCurrentCombination}
          className="me-3"
        >
          Save This Combination
        </Button>
        <Button variant="outline-primary" size="md">
          Get a Quote for This Design
        </Button>
      </div>

      {savedCombinations.length > 0 && (
        <div className="saved-combinations mt-5">
          <h5>Your Saved Combinations</h5>
          <Row className="g-3 justify-content-center">
            {savedCombinations.map((combo) => (
              <Col key={combo.id} xs={6} sm={4} md={3} lg={2}>
                <Card
                  className="border-0 shadow-sm h-100 text-center p-2"
                  onClick={() => applySavedCombination(combo)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-flex justify-content-center mb-2">
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: combo.walls,
                        border: "1px solid #ddd",
                        marginRight: "2px",
                      }}
                    />
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: combo.roof,
                        border: "1px solid #ddd",
                        marginRight: "2px",
                      }}
                    />
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: combo.door,
                        border: "1px solid #ddd",
                      }}
                    />
                  </div>
                  <small>Saved Design</small>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default HouseColorSelector;
