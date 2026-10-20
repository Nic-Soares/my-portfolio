import type { ReactNode } from "react";
import Shape from "@/components/decor/Shape/Shape.tsx";
import {
  SHAPE_PATHS,
  type ShapeName,
} from "@/components/decor/Shape/shapePaths.ts";
import TabbedNavigation from "@/components/layout/navigation/TabbedNavigation/TabbedNavigation.tsx";
import Button from "@/components/ui/Button/Button.tsx";
import Chip from "@/components/ui/Chip/Chip.tsx";
import ChipRow from "@/components/ui/Chip/ChipRow.tsx";
import CompanyLogo from "@/components/ui/CompanyLogo/CompanyLogo.tsx";
import ConnectedButtonGroup from "@/components/ui/ConnectedButtonGroup/ConnectedButtonGroup.tsx";
import IconButton from "@/components/ui/IconButton/IconButton.tsx";
import LinearProgress from "@/components/ui/LinearProgress/LinearProgress.tsx";
import SearchBar from "@/components/ui/SearchBar/SearchBar.tsx";
import ProjectCard from "@/features/work/components/ProjectList/ProjectCard/ProjectCard.tsx";
import styles from "./Gallery.module.css";

const SIZES = ["xsmall", "small", "medium", "large", "xlarge"] as const;
const BUTTON_STYLES = [
  "filled",
  "tonal",
  "outline",
  "text",
  "elevated",
] as const;
const ICON_BUTTON_STYLES = ["filled", "tonal", "outline", "standard"] as const;

// Every entry must exist in Figma (ROADMAP §EP-04, ST-04.1): `figma` is the
// component name there, `source` says where it lives.
function Specimen({
  name,
  figma,
  source,
  children,
}: {
  name: string;
  figma: string;
  source: "Components page" | "M3 library";
  children: ReactNode;
}) {
  return (
    <section className={styles.specimen} aria-labelledby={`specimen-${name}`}>
      <header className={styles.specimenHeader}>
        <h2 id={`specimen-${name}`} className="headline-small">
          {name}
        </h2>
        <p className="body-medium">
          Figma: <strong>{figma}</strong> · {source}
        </p>
      </header>
      {children}
    </section>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={styles.row}>
      <span className={`label-medium ${styles.rowLabel}`}>{label}</span>
      <div className={styles.rowItems}>{children}</div>
    </div>
  );
}

export default function GalleryContent() {
  return (
    <div className={styles.content}>
      <Specimen name="Button" figma="Button" source="M3 library">
        <Row label="Style (small)">
          {BUTTON_STYLES.map((style) => (
            <Button key={style} size="small" style={style} label={style} />
          ))}
        </Row>
        <Row label="Size (filled)">
          {SIZES.map((size) => (
            <Button key={size} size={size} label={size} />
          ))}
        </Row>
        <Row label="Square · selected · disabled">
          <Button type="square" size="small" label="Square" />
          <Button size="small" style="tonal" label="Selected" selected />
          <Button size="small" label="Disabled" disabled />
        </Row>
      </Specimen>

      <Specimen name="IconButton" figma="Icon button" source="M3 library">
        <Row label="Style (round)">
          {ICON_BUTTON_STYLES.map((style) => (
            <IconButton
              key={style}
              style={style}
              icon="favorite"
              ariaLabel={style}
            />
          ))}
        </Row>
        <Row label="Style (square)">
          {ICON_BUTTON_STYLES.map((style) => (
            <IconButton
              key={style}
              type="square"
              style={style}
              icon="favorite"
              ariaLabel={style}
            />
          ))}
        </Row>
        <Row label="Selected · disabled">
          <IconButton
            style="tonal"
            icon="dark_mode"
            selectedIcon="light_mode"
            selected
            ariaLabel="Selected"
          />
          <IconButton icon="favorite" disabled ariaLabel="Disabled" />
        </Row>
      </Specimen>

      <Specimen
        name="ConnectedButtonGroup"
        figma="Connected button group"
        source="M3 library"
      >
        {(["xsmall", "small", "medium"] as const).map((size) => (
          <Row key={size} label={size}>
            <ConnectedButtonGroup
              size={size}
              options={[
                { label: "All" },
                { label: "Favorites" },
                { label: "Recent" },
              ]}
              selectedIndex={0}
            />
          </Row>
        ))}
        <Row label="selectionMode=multiple (try it)">
          <ConnectedButtonGroup
            selectionMode="multiple"
            options={[
              { label: "Data" },
              { label: "Frontend" },
              { label: "Backend" },
              { label: "Design" },
            ]}
          />
        </Row>
      </Specimen>

      <Specimen name="Chip" figma="Input chip" source="M3 library">
        <Row label="Home skills (static, ChipRow)">
          <ChipRow ariaLabel="Skills">
            <Chip label="#Python" />
            <Chip label="3+ Years in Data" />
            <Chip label="Power BI · SQL" />
            <Chip label="TypeScript" />
            <Chip label="Applied AI" />
          </ChipRow>
        </Row>
        <Row label="Interactive · selected · disabled">
          <Chip label="Enabled" onClick={() => {}} />
          <Chip label="Selected" selected onClick={() => {}} />
          <Chip label="Disabled" disabled onClick={() => {}} />
          <Chip label="Selected disabled" selected disabled />
        </Row>
        <Row label="Leading icon · avatar · closing icon">
          <Chip
            label="Leading icon"
            leadingIcon="database"
            onClick={() => {}}
          />
          <Chip label="Avatar" avatar="/favicon.svg" onClick={() => {}} />
          <Chip label="Closing icon" onRemove={() => {}} />
          <Chip
            label="All slots"
            leadingIcon="database"
            selected
            onClick={() => {}}
            onRemove={() => {}}
          />
        </Row>
      </Specimen>

      <Specimen
        name="LinearProgress"
        figma="Linear Progress"
        source="Components page"
      >
        <Row label="Indeterminate (400px, as Figma)">
          <div style={{ width: 400 }}>
            <LinearProgress />
          </div>
        </Row>
        <Row label="Determinate 40% (400px, as Figma)">
          <div style={{ width: 400 }}>
            <LinearProgress value={40} />
          </div>
        </Row>
      </Specimen>

      <Specimen name="Shape" figma="Shape Set" source="M3 library">
        <Row label="Shapes (Primary Container, 96px)">
          {(Object.keys(SHAPE_PATHS) as ShapeName[]).map((shape) => (
            <Shape key={shape} shape={shape} size={96} title={shape} />
          ))}
        </Row>
        <Row label="Colors (Very sunny)">
          {(
            [
              "primary",
              "primary-container",
              "secondary",
              "secondary-container",
              "tertiary",
              "tertiary-container",
              "error",
              "error-container",
              "surface-container-high",
            ] as const
          ).map((color) => (
            <Shape
              key={color}
              shape="very-sunny"
              color={color}
              size={64}
              title={color}
            />
          ))}
        </Row>
      </Specimen>

      <Specimen name="SearchBar" figma="Search bar" source="M3 library">
        <Row label="Empty · filled · disabled">
          <SearchBar />
          <SearchBar value="Spotify" />
          <SearchBar disabled />
        </Row>
      </Specimen>

      <Specimen
        name="TabbedNavigation"
        figma="Tab Bar"
        source="Components page"
      >
        <TabbedNavigation
          tabs={[
            { id: "overview", label: "Overview" },
            { id: "architecture", label: "Architecture" },
            { id: "repository", label: "Repository" },
          ]}
          selectedId="overview"
        />
      </Specimen>

      <Specimen
        name="ProjectCard"
        figma="Project Card"
        source="Components page"
      >
        <div className={styles.cardWrap}>
          <ProjectCard
            title="Spotify Clone"
            company="Personal Project"
            categories={["Design", "Frontend", "Backend", "Data"]}
          />
        </div>
      </Specimen>

      <Specimen name="CompanyLogo" figma="Company logo" source="M3 library">
        <Row label="Logos">
          {["boltshift", "alphawave", "coreos"].map((logo) => (
            <CompanyLogo key={logo} company={{ name: logo, logo }} />
          ))}
        </Row>
      </Specimen>
    </div>
  );
}
