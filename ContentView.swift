import SwiftUI
import Lottie

struct ContentView: View {
    @StateObject private var calculator = SalaryCalculator()
    @State private var monthlySalary = ""
    @State private var workDays = "22"
    @State private var dailyHours = "9.0"
    
    var body: some View {
        VStack(spacing: 20) {
            SecureField("月薪（元）", text: $monthlySalary)
                .keyboardType(.decimalPad)
                .textFieldStyle(RoundedBorderTextFieldStyle())
            
            HStack {
                TextField("工作天数", text: $workDays)
                TextField("每日小时", text: $dailyHours)
            }
            .keyboardType(.numberPad)
            .textFieldStyle(RoundedBorderTextFieldStyle())
            
            LottieView(name: "gold_coins", loopMode: .loop)
                .frame(height: 200)
            
            Text(String(format: "%.2f 元", calculator.totalEarnings))
                .font(.system(size: 40, weight: .bold))
                .foregroundStyle(LinearGradient(
                    colors: [.yellow, .orange],
                    startPoint: .leading,
                    endPoint: .trailing
                ))
            
            Button("开始计算") {
                calculator.authenticateWithBiometrics { success in
                    if success {
                        startCalculation()
                    }
                }
            }
            .buttonStyle(GoldButtonStyle())
        }
        .padding()
    }
    
    private func startCalculation() {
        guard let salary = Double(monthlySalary),
              let days = Int(workDays),
              let hours = Double(dailyHours) else { return }
        calculator.startCalculation(
            monthlySalary: salary,
            workDays: days,
            dailyHours: hours
        )
    }
}

struct GoldButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .padding()
            .background(
                RoundedRectangle(cornerRadius: 15)
                    .fill(LinearGradient(
                        colors: [.yellow, .orange],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    ))
            )
            .scaleEffect(configuration.isPressed ? 0.95 : 1)
    }
}

struct LottieView: UIViewRepresentable {
    let name: String
    let loopMode: LottieLoopMode
    
    func makeUIView(context: Context) -> Lottie.LottieAnimationView {
        let animationView = LottieAnimationView(name: name)
        animationView.loopMode = loopMode
        animationView.play()
        return animationView
    }
    
    func updateUIView(_ uiView: Lottie.LottieAnimationView, context: Context) {}
}