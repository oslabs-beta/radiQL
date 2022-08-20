"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
// @ts-ignore
const rad2_png_1 = __importDefault(require("../../public/images/rad2.png"));
// @ts-ignore
const about1_png_1 = __importDefault(require("../../public/images/about1.png"));
// @ts-ignore
const alex_jpeg_1 = __importDefault(require("../../public/images/profiles/alex.jpeg"));
// @ts-ignore
const roy_png_1 = __importDefault(require("../../public/images/profiles/roy.png"));
// @ts-ignore
const zach_png_1 = __importDefault(require("../../public/images/profiles/zach.png"));
// @ts-ignore
const thomas_png_1 = __importDefault(require("../../public/images/profiles/thomas.png"));
// import jordan from '../../public/images/profiles/jordan.png';
const framer_motion_1 = require("framer-motion");
const fa_1 = require("react-icons/fa");
const About = props => {
    return (React.createElement("div", { id: "about" },
        React.createElement(framer_motion_1.motion.div, { className: "box", initial: { opacity: 0, y: 100 }, animate: { opacity: 1, y: 0 }, transition: { type: "tween", duration: 0.7 } },
            React.createElement("div", { className: 'app-description' },
                React.createElement("img", { id: 'about-logo', src: rad2_png_1.default }),
                React.createElement("section", { className: 'info-1' },
                    React.createElement("span", null,
                        React.createElement("header", null, "What is radiQL?"),
                        React.createElement("hr", null),
                        React.createElement("p", null, "radiQL is a web application for generating GraphQL schemas and resolvers for your database."),
                        React.createElement("p", null, "While GraphQL is great, there is a big learning curve setting up schemas and resolvers. Transitioning from a REST API infrastructure to a GraphQL infrastructure is no easy task.")),
                    React.createElement("img", { src: about1_png_1.default })),
                React.createElement("section", { className: 'info-1' },
                    React.createElement("img", { src: about1_png_1.default }),
                    React.createElement("span", null,
                        React.createElement("header", null, "Why use GraphQL?"),
                        React.createElement("hr", null),
                        React.createElement("p", null, "REST APIs are great, but they have some problems that can slow down servers, especially when working with large databases. REST calls have a problem with over-fetching data, which leads to longer response times; as well as under-fetching data, which leads to creating multiple fetch requests to retrieve the desired data."),
                        React.createElement("p", null, "While GraphQL is great, there is a big learning curve setting up schemas and resolvers. Transitioning from a REST API infrastructure to a GraphQL infrastructure is no easy task."),
                        React.createElement("p", null, "That's where our app comes in..."))))),
        React.createElement("header", null, "Meet The Team"),
        React.createElement("hr", null),
        React.createElement("div", { className: 'bro-container' },
            React.createElement("span", { className: 'about-box about-1' },
                React.createElement("img", { src: alex_jpeg_1.default }),
                React.createElement("section", null,
                    React.createElement("header", { className: "name" }, "Alex Cusick"),
                    React.createElement("p", null,
                        React.createElement("a", { className: 'link', href: "https://github.com/Alex-cusick" },
                            React.createElement(fa_1.FaGithub, null)),
                        React.createElement("a", { className: 'link', href: "https://www.linkedin.com/in/alex-q6/" },
                            React.createElement(fa_1.FaLinkedin, null))))),
            React.createElement("span", { className: 'about-box about-2' },
                React.createElement("img", { src: thomas_png_1.default }),
                React.createElement("section", null,
                    React.createElement("header", { className: "name" }, "Thomas Ho"),
                    React.createElement("p", null,
                        React.createElement("a", { className: 'link', href: "https://github.com/t1ho" },
                            React.createElement(fa_1.FaGithub, null)),
                        React.createElement("a", { className: 'link', href: "https://www.linkedin.com/in/t1ho/" },
                            React.createElement(fa_1.FaLinkedin, null))))),
            React.createElement("span", { className: 'about-box about-3' },
                React.createElement("img", { src: roy_png_1.default }),
                React.createElement("section", null,
                    React.createElement("header", { className: "name" }, "Roy Jiang"),
                    React.createElement("p", null,
                        React.createElement("a", { className: 'link', href: "https://github.com/rjiang12" },
                            React.createElement(fa_1.FaGithub, null)),
                        React.createElement("a", { className: 'link', href: "www.linkedin.com/in/royjiang2025/" },
                            React.createElement(fa_1.FaLinkedin, null))))),
            React.createElement("span", { className: 'about-box about-4' },
                React.createElement("img", { src: zach_png_1.default }),
                React.createElement("section", null,
                    React.createElement("header", { className: "name" }, "Zach Robertson"),
                    React.createElement("p", null,
                        React.createElement("a", { className: 'link', href: "https://github.com/Zachrobdev" },
                            React.createElement(fa_1.FaGithub, null)),
                        React.createElement("a", { className: 'link', href: "https://www.linkedin.com/in/zach-robertson-profile/" },
                            React.createElement(fa_1.FaLinkedin, null))))),
            React.createElement("span", { className: 'about-box about-5' },
                React.createElement("section", null,
                    React.createElement("header", { className: "name" }, "Jordan Williams"),
                    React.createElement("p", null,
                        React.createElement("a", { className: 'link', href: "https://github.com/jordanobl" },
                            React.createElement(fa_1.FaGithub, null)),
                        React.createElement("a", { className: 'link', href: "" },
                            React.createElement(fa_1.FaLinkedin, null)))))),
        React.createElement("br", { style: { height: "100px" } })));
};
exports.default = About;
//# sourceMappingURL=About.js.map