/* Seção de Planos */
.pricing {
    padding: 80px 0;
    background: white;
}

.pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
}

.pricing-card {
    background: white;
    border: 2px solid #e9ecef;
    border-radius: 15px;
    padding: 2.5rem;
    text-align: center;
    transition: all 0.3s ease;
    position: relative;
}

.pricing-card.free {
    border-color: #28a745;
    background: linear-gradient(135deg, #f8fff8, #ffffff);
}

.pricing-card.featured {
    border-color: #667eea;
    background: linear-gradient(135deg, #f0f4ff, #ffffff);
    transform: scale(1.05);
}

.pricing-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.pricing-card.featured:hover {
    transform: scale(1.05) translateY(-10px);
}

.pricing-header {
    margin-bottom: 2rem;
}

.plan-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.pricing-card h3 {
    font-size: 1.5rem;
    color: #2c5aa0;
    margin-bottom: 1rem;
}

.price {
    font-size: 2.5rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 1rem;
}

.price span {
    font-size: 1rem;
    color: #666;
}

.plan-badge {
    display: inline-block;
    background: #667eea;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
}

.pricing-card.free .plan-badge {
    background: #28a745;
}

.pricing-features {
    text-align: left;
    margin-bottom: 2rem;
}

.pricing-features ul {
    list-style: none;
}

.pricing-features li {
    padding: 0.5rem 0;
    position: relative;
    padding-left: 1.5rem;
}

.pricing-features li:before {
    content: "✓";
    color: #28a745;
    position: absolute;
    left: 0;
    font-weight: bold;
}

.pricing-cta {
    margin-top: 2rem;
}

/* Vantagens dos Consultores */
.consultor-benefits {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 4rem 2rem;
    border-radius: 15px;
    text-align: center;
}

.consultor-benefits h3 {
    font-size: 2rem;
    margin-bottom: 3rem;
}

.benefits-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

.benefit-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    text-align: left;
}

.benefit-icon {
    font-size: 2.5rem;
    flex-shrink: 0;
}

.benefit-content h4 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
}

.benefit-content p {
    opacity: 0.9;
    line-height: 1.5;
}

/* Responsive */
@media (max-width: 768px) {
    .pricing-grid {
        grid-template-columns: 1fr;
    }
    
    .pricing-card.featured {
        transform: none;
    }
    
    .pricing-card.featured:hover {
        transform: translateY(-10px);
    }
    
    .benefit-item {
        text-align: center;
        flex-direction: column;
    }
}
