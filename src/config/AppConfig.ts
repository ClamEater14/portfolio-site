import { Color } from "@react-three/fiber";
import { Property } from "csstype";

export class AppConfig {
	static backgroundColor: Property.Background = "#000000"; //"#212121";
	static hedronColor: Color = "#00b3ff";
	static cardWidth: number = 320;
	static cardHeight: number = 180;
	static logoURL: string = "https://files.caleblamcodes.dev/logo.svg";
	static ogImageURL: string = "https://files.caleblamcodes.dev/logo.png";
	static apiURL: string = "https://strapi.caleblamcodes.dev/api";
	static cardsPerPage: number = 16;
}