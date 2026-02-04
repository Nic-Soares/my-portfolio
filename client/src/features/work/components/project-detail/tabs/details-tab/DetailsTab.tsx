import React from "react";

interface DetailsTabProps {
  projectId?: string | null;
}

/**
 * DetailsTab
 *
 * Component used as the "Details" tab content in the Work Detail page.
 * It provides a place to describe implementation details, challenges and
 * technical decisions for a given project.
 */
const DetailsTab: React.FC<DetailsTabProps> = ({ projectId }) => {
  return (
    <section>
      <h2>Details</h2>

      <p>
        This section contains more detailed information about the
        implementation, the challenges encountered during development, and the
        technical decisions made throughout the project lifecycle.
      </p>

      <h3>Key areas</h3>
      <ul>
        <li>Architecture and component structure</li>
        <li>Performance optimizations and trade-offs</li>
        <li>Accessibility and responsive design considerations</li>
        <li>Testing strategy and CI/CD integration</li>
      </ul>

      <h3>Technical decisions</h3>
      <p>
        Decisions were guided by maintainability, developer experience and the
        constraints of the project timeline. Libraries and patterns were chosen
        to balance quick iteration with long-term stability.
      </p>

      {projectId ? (
        <p>
          <strong>Project:</strong> {projectId}
        </p>
      ) : null}
    </section>
  );
};

export default DetailsTab;
