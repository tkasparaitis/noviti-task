<?php

namespace App\Controller;

use App\Entity\RepaymentDetail;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class NovitiController extends AbstractController
{
    #[Route('/noviti', name: 'app_noviti', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): JsonResponse
    {
        $repaymentDetails = $entityManager->getRepository(RepaymentDetail::class)->findAll();

        if (!$repaymentDetails) {
            return new JsonResponse(['error' => 'No details found.'], 404);
        }

        $repaymentDetailsArray = [];
        foreach ($repaymentDetails as $repaymentDetail) {
            $details = $repaymentDetail->getRepaymentDetails();

            $repaymentDetailsArray[] = [
                'id' => $repaymentDetail->getId(),
                'term' => $repaymentDetail->getTermInMonths(),
                'amount' => $repaymentDetail->getLoanAmount(),
                'interest' => $repaymentDetail->getYearlyInterest(),
                'repayment' => $repaymentDetail->getRepaymentType(),
                'details' => $details,
            ];
        }
        return new JsonResponse(['repayment_details' => $repaymentDetailsArray]);
    }

    #[Route('/post', name: 'app_create_loan', methods: ['POST'])]
    public function createLoan(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $loanAmount = (float) $data['amount'];
        $yearlyInterest = (float) $data['interest'];
        $termInMonths = (int) $data['month'];
        $repaymentType = $data['repayment'];

        if ($repaymentType === "annuity") {
            $monthlyPayment = $this->calculateMonthlyPayment($loanAmount, $yearlyInterest, $termInMonths);
            $remainingCreditAmount = $loanAmount;
            $repaymentDetails = [];

            for ($i = 1; $i <= $termInMonths; $i++) {
                $interestAmount = $remainingCreditAmount * ($yearlyInterest / 100) / 12;
                $principalAmount = $monthlyPayment - $interestAmount;
                $remainingCreditAmount -= $principalAmount;

                $repaymentDetails[] = [
                    'month' => $i,
                    'monthly' => round($monthlyPayment, 2),
                    'remaining' => round($remainingCreditAmount, 2),
                    'principal' => round($principalAmount, 2),
                    'interest' => round($interestAmount, 2),
                ];
            }

            $repaymentDetail = new RepaymentDetail();
            $repaymentDetail->setTermInMonths($termInMonths);
            $repaymentDetail->setLoanAmount($loanAmount);
            $repaymentDetail->setYearlyInterest($yearlyInterest);
            $repaymentDetail->setRepaymentType($repaymentType);
            $repaymentDetail->setRepaymentDetails($repaymentDetails);
            $entityManager->persist($repaymentDetail);
            $entityManager->flush();

            return new JsonResponse(['repayment_details' => $repaymentDetail->getRepaymentDetails()]);
        } else {
            return new JsonResponse(['error' => 'Unsupported type.'], 400);
        }
    }

    private function calculateMonthlyPayment($loanAmount, $yearlyInterest, $termInMonths)
    {
        $monthlyInterest = ($yearlyInterest / 100) / 12;
        $monthlyPayment = $loanAmount * ($monthlyInterest) / (1 - pow(1 + $monthlyInterest, -$termInMonths));
        return $monthlyPayment;
    }
}
