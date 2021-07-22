Feature: As a user, I can do different type of filtering  & sorting  in the showroom page


Scenario Outline: As a user, I can see cars which are the given make & model
    Given I open showroom page
    Then I filter using the carmodel <model>
    Examples:
      | model |
      | skoda |
      | audi  |
      | tesla |

#  Scenario: As a user, I can see cars which has 'Best Deals' in the showroom page
#    Given I am on the showroom page
#    When I select Best deals option from  popular filter
#    Then I should see Best deals tag on all the displayed cars
#
#  Scenario: As a user, I can see cars which has 'Configure yourself' option in the showroom page
#    Given I am on the showroom page
#    When I select Configure yourself option from  popular filter
#    Then I should see choose from option on all the displayed cars
#
#  Scenario: As a user, I can do filtering for 'Delivery van' in the showroom page
#    Given I am on the showroom page
#    When I select Configure yourself option from  popular filter
#    Then I should see Delivery van tag on all the displayed cars
#
#  Scenario: As a user, I can see cars which has 'Fast delivery' option in the showroom page
#    Given I am on the showroom page
#    When I select Configure yourself option from  popular filter
#    Then I should see Fast delivery tag on all the displayed cars
#
#  Scenario: As a user, I can see cars which has 'Fast delivery' option in the showroom page
#    Given I am on the showroom page
#    When I select Configure yourself option from  popular filter
#    Then I should see Fast delivery tag on all the displayed cars
#
#  Scenario Outline: As a user, If I do sorting by price ascending/descending I should see that the cars are listed accordingly
#    Given I am on the showroom page
#    When I sort cars using <order> option
#    Then I should see that the cars are displayed in <priceOrder> order
#    Examples:
#      | carmodel | priceOrder |
#      | low-high | Ascending  |
#      | High-low | Discending |

