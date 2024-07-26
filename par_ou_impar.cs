using System;

class Program {
  public static void Main (string[] args) {

    Console.WriteLine("Digite um número qualquer: ");
    double num1 = Convert.ToDouble(Console.ReadLine());

    if (num1 % 2 == 0) {
      Console.WriteLine("Este número é par.");
    } else {
      Console.WriteLine("Este número é ímpar.");
    }
    
  }
}