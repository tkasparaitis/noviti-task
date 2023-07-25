<?php

namespace App\Entity;

use App\Repository\RepaymentDetailRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RepaymentDetailRepository::class)]
class RepaymentDetail
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $termInMonths = null;

    #[ORM\Column]
    private ?float $loanAmount = null;

    #[ORM\Column]
    private ?float $yearlyInterest = null;

    #[ORM\Column(length: 255)]
    private ?string $repaymentType = null;

    #[ORM\Column(type: Types::ARRAY)]
    private array $repaymentDetails = [];

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTermInMonths(): ?int
    {
        return $this->termInMonths;
    }

    public function setTermInMonths(int $termInMonths): static
    {
        $this->termInMonths = $termInMonths;

        return $this;
    }

    public function getLoanAmount(): ?float
    {
        return $this->loanAmount;
    }

    public function setLoanAmount(float $loanAmount): static
    {
        $this->loanAmount = $loanAmount;

        return $this;
    }

    public function getYearlyInterest(): ?float
    {
        return $this->yearlyInterest;
    }

    public function setYearlyInterest(float $yearlyInterest): static
    {
        $this->yearlyInterest = $yearlyInterest;

        return $this;
    }

    public function getRepaymentType(): ?string
    {
        return $this->repaymentType;
    }

    public function setRepaymentType(string $repaymentType): static
    {
        $this->repaymentType = $repaymentType;

        return $this;
    }

    public function getRepaymentDetails(): array
    {
        return $this->repaymentDetails;
    }

    public function setRepaymentDetails(array $repaymentDetails): static
    {
        $this->repaymentDetails = $repaymentDetails;

        return $this;
    }
}
