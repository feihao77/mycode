import Foundation
import LocalAuthentication

class SalaryCalculator: ObservableObject {
    @Published var hourlyRate: Double = 0
    @Published var totalEarnings: Double = 0
    
    private var timer: Timer?
    private var startTime: Date?
    
    func startCalculation(monthlySalary: Double, workDays: Int, dailyHours: Double) {
        let hourlyRate = monthlySalary / (Double(workDays) * dailyHours)
        self.hourlyRate = hourlyRate
        startTime = Date()
        
        timer = Timer.scheduledTimer(withTimeInterval: 0.1, repeats: true) { [weak self] _ in
            guard let self = self, let start = self.startTime else { return }
            let elapsed = Date().timeIntervalSince(start)
            self.totalEarnings = hourlyRate * (elapsed / 3600)
        }
    }
    
    func authenticateWithBiometrics(completion: @escaping (Bool) -> Void) {
        let context = LAContext()
        var error: NSError?
        
        if context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) {
            context.evaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, localizedReason: "解锁以访问薪资数据") { success, _ in
                DispatchQueue.main.async {
                    completion(success)
                }
            }
        } else {
            completion(false)
        }
    }
}