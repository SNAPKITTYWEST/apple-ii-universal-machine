import Foundation

public struct LispMachine {
    public init() {}

    public enum LispValue {
        case number(Double)
        case string(String)
        case list([LispValue])
        case symbol(String)
        case null
    }

    public func eval(_ input: String) -> String {
        let trimmed = input.trimmingCharacters(in: .whitespaces)
        guard trimmed.hasPrefix("("), trimmed.hasSuffix(")") else {
            return "Error: Not an s-expression"
        }
        let inner = String(trimmed.dropFirst().dropLast())
        let parts = inner.components(separatedBy: " ")
        guard let op = parts.first else { return "Error: Empty expression" }

        switch op {
        case "+":
            let nums = parts.dropFirst().compactMap { Double($0) }
            return String(nums.reduce(0, +))
        case "-":
            let nums = parts.dropFirst().compactMap { Double($0) }
            guard let first = nums.first else { return "0" }
            return String(nums.dropFirst().reduce(first, -))
        case "*":
            let nums = parts.dropFirst().compactMap { Double($0) }
            return String(nums.reduce(1, *))
        case "/":
            let nums = parts.dropFirst().compactMap { Double($0) }
            guard let first = nums.first, let second = nums.dropFirst().first, second != 0 else { return "Error" }
            return String(first / second)
        case "agent-status":
            return "ENKI: active (sim) — tension proposer\nSENTINEL: active (sim) — claim auditor\nAll local, no remote."
        case "trust-score":
            return "trust: 75%\nevents: 10\nseals: 5"
        case "draw-agent":
            return """
                  .---.
                 /     \\      [LISP AGENT: AWAKE]
                | () () |     [TRUST: VERIFIED]
                 \\  ^  /      [ADA CONTRACT: ALLOWED]
                  |||||       [WOZ VAULT: ONLINE]
            """
        case "woz-vault-count":
            return "10"
        case "seal-state":
            return "sealed_events: 5\nlast_seal: 0x1a2b3c..."
        default:
            return "Unknown function: \(op)"
        }
    }
}
