import '@testing-library/jest-dom/vitest';
import ResizeObserver from "resize-observer-polyfill";
import { server } from "./mocks/server.ts";
import {afterAll, beforeAll} from "vitest";

//this setup file is executed before each test file,
// we start the serve, so it listens for the requests
// to th endpoints we configured
beforeAll(() => server.listen());
//after each test we need to reset our handlers
// so each test runs in a clean state
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

global.ResizeObserver = ResizeObserver;

window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();

Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});