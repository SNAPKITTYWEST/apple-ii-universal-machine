import Foundation

public struct Runtime {
    public let version = "1.0.0"
    public let name = "Apple II Universal Machine Runtime"

    public init() {}

    public func boot() -> String {
        return "SUN BOOT COMPLETE — Swift Runtime v\(version)"
    }

    public func status() -> String {
        return """
        ╔══════════════════════════════════════╗
        ║  SWIFT RUNTIME STATUS                ║
        ╠══════════════════════════════════════╣
        ║  VERSION:  \(version.padding(toLength: 25, withPad: " ", startingAt: 0))║
        ║  RUNTIME:  SwiftWasm (simulated)     ║
        ║  STATUS:   ACTIVE                    ║
        ╚══════════════════════════════════════╝
        """
    }

    public func parseCommand(_ input: String) -> (verb: String, args: [String]) {
        let trimmed = input.trimmingCharacters(in: .whitespaces)
        let parts = trimmed.components(separatedBy: " ")
        guard let verb = parts.first else { return ("", []) }
        let args = parts.count > 1 ? Array(parts.dropFirst()) : []
        return (verb.lowercased(), args)
    }
}
