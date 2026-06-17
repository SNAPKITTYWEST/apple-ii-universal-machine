import Foundation

public struct TrustContract {
    public enum Status: String {
        case allowed = "ALLOWED"
        case denied = "DENIED"
    }

    public struct Result {
        public let allowed: Bool
        public let contract: String
        public let reason: String
    }

    public init() {}

    public func canBoot() -> Result {
        return Result(allowed: true, contract: "Can_Boot", reason: "System boot")
    }

    public func canRunDebate() -> Result {
        return Result(allowed: true, contract: "Can_Run_Debate", reason: "Debate access")
    }

    public func canWriteAudit() -> Result {
        return Result(allowed: true, contract: "Can_Write_Audit", reason: "Audit write")
    }

    public func canClearVault(userConfirmed: Bool) -> Result {
        return Result(
            allowed: userConfirmed,
            contract: "Can_Clear_Vault",
            reason: userConfirmed ? "User confirmed" : "User confirmation required"
        )
    }

    public func canExportSnapshot() -> Result {
        return Result(allowed: true, contract: "Can_Export_Snapshot", reason: "Export access")
    }

    public func canInvokeLisp() -> Result {
        return Result(allowed: true, contract: "Can_Invoke_Lisp", reason: "Safe Lisp form")
    }

    public func canInvokeRuntime() -> Result {
        return Result(allowed: true, contract: "Can_Invoke_Runtime", reason: "Runtime access")
    }
}
