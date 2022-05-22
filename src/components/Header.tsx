import * as React from "react";
import {
  Stack,
  Link,
  ILinkStyleProps,
  ILinkStyles,
  ITheme,
  IStackProps,
} from "@fluentui/react";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { Panel, PanelType } from "@fluentui/react/lib/Panel";
import { Pivot, PivotItem } from "@fluentui/react/lib/Pivot";
import {
  IThemeRules,
  ThemeGenerator,
} from "@fluentui/react/lib/ThemeGenerator";
import { mergeStyles } from "@fluentui/merge-styles";

export interface IHeaderProps {
  themeRules?: IThemeRules;
}

export interface IHeaderState {
  showPanel: boolean;
  jsonTheme: string;
  powershellTheme: string;
  themeAsCode: any;
}

const outputPanelClassName = mergeStyles({
  display: "flex",
});

const textAreaClassName = mergeStyles({
  height: 350,
  width: "100%",
  marginRight: 28,
  backgroundColor: "white",
  color: "#333",
});

const microsoftLogo = mergeStyles({
  width: "120px",
  display: "block",
});

const pipeFabricStyles = (p: ILinkStyleProps): ILinkStyles => ({
  root: {
    textDecoration: "none",
    color: p.theme.semanticColors.bodyText,
    fontWeight: "600",
    fontSize: p.theme.fonts.medium.fontSize,
    padding: "4px",
  },
});

const headerStackStyles = (p: IStackProps, theme: ITheme) => ({
  root: {
    backgroundColor: theme.semanticColors.bodyBackground,
    minHeight: 47,
    padding: "0 32px",
    boxShadow: theme.effects.elevation16,
  },
});

export class Header extends React.Component<IHeaderProps, IHeaderState> {
  constructor(props: any) {
    super(props);
    this.state = {
      showPanel: false,
      jsonTheme: "",
      powershellTheme: "",
      themeAsCode: <div />,
    };
  }

  public render(): JSX.Element {
    return (
      <Stack
        horizontal
        verticalAlign="center"
        grow={0}
        styles={headerStackStyles}
      >
        <Stack horizontal grow={1} verticalAlign="center">
          <a
            href="https://www.microsoft.com"
            title="Microsoft Home Page"
            aria-label="Microsoft Home Page"
            className={microsoftLogo}
          >
            <img
              alt="Microsoft Logo"
              src="https://themingdesigner.blob.core.windows.net/$web/MicrosoftLogo.png"
              className={microsoftLogo}
            />
          </a>
          <Link
            href="/"
            title="Home"
            aria-label="Home"
            styles={pipeFabricStyles}
          >
            Home
          </Link>
          <Link
            href="/#contact"
            title="Contact"
            aria-label="Contact Me"
            styles={pipeFabricStyles}
          >
            Contact Me
          </Link>
        </Stack>
        <PrimaryButton text="Export theme" onClick={this._showPanel} />
        <Panel
          isOpen={this.state.showPanel}
          type={PanelType.smallFixedFar}
          onDismiss={this._hidePanel}
          headerText="Export theme"
          closeButtonAriaLabel="Close"
          onRenderFooterContent={this._onRenderFooterContent}
        >
          <span>
            <p>
              This code block creates the theme you have configured above using
              the createTheme utility function. Calling loadTheme with this
              theme will automatically apply the configured theming to any
              Fabric controls used within the same app. You can also export this
              example to CodePen with a few component examples below.
            </p>
          </span>
          <div className={outputPanelClassName}>
            <Pivot>
              <PivotItem headerText="Code">
                <textarea
                  className={textAreaClassName}
                  readOnly={true}
                  spellCheck={false}
                  value={this.state.themeAsCode}
                />
              </PivotItem>
              <PivotItem headerText="JSON">
                <textarea
                  className={textAreaClassName}
                  readOnly={true}
                  spellCheck={false}
                  value={this.state.jsonTheme}
                />
              </PivotItem>
              <PivotItem headerText="PowerShell">
                <textarea
                  className={textAreaClassName}
                  readOnly={true}
                  spellCheck={false}
                  value={this.state.powershellTheme}
                />
              </PivotItem>
            </Pivot>
          </div>
        </Panel>
      </Stack>
    );
  }

  private _exportToJson = () => {
    const themeRules = this.props.themeRules!;

    // strip out the unnecessary shade slots from the final output theme
    const abridgedTheme: IThemeRules = {};
    for (const ruleName in themeRules) {
      if (themeRules.hasOwnProperty(ruleName)) {
        if (
          ruleName.indexOf("ColorShade") === -1 &&
          ruleName !== "primaryColor" &&
          ruleName !== "backgroundColor" &&
          ruleName !== "foregroundColor" &&
          ruleName.indexOf("body") === -1
        ) {
          abridgedTheme[ruleName] = themeRules[ruleName];
        }
      }
    }

    this.setState({
      jsonTheme: JSON.stringify(
        ThemeGenerator.getThemeAsJson(abridgedTheme),
        undefined,
        2
      ),
      powershellTheme: ThemeGenerator.getThemeForPowerShell(abridgedTheme),
      themeAsCode: ThemeGenerator.getThemeAsCodeWithCreateTheme(abridgedTheme),
    });
  };

  private _onRenderFooterContent = () => {
    return <div></div>;
  };

  private _showPanel = () => {
    this.setState({ showPanel: true });
    this._exportToJson();
  };

  private _hidePanel = () => {
    this.setState({ showPanel: false });
  };
}
