Feature: As a user, I can do different type of filtering  & sorting  in the showroom page
  Scenario Outline: As a user, I can see cars which are the given make & model
    Given I open showroom page
    When I filter using the carmodel <model>
    Then I should see only <model> cars
    Examples:
      | model |
      | skoda |
      | audi  |
      | tesla |

  Scenario Outline: As a user, I shouldn't see cars when I filter using the invalid price range
    Given I filter showroom page using the price <from> <to>
    Then I should see only those cars that are in the same price <from> <to>
    Examples:
      | from | to   |
      | 200  | 3560 |
      | 300  | 2025 |
      | 800  | 2920 |

##there is a bug in the website hence some of the following scenarios will fail
  Scenario Outline: As a user, I should see an error message when searched with invalid price range
    Given I filter showroom page using the price <from> <to>
    Then I should see error message
    Examples:
      | from | to   |
      | 1200 | 500  |
      | 1000 | 10   |
      | 5000 | 8000 |

  Scenario Outline: As a user, If I do sorting by price ascending/descending I should see that the cars are listed accordingly
    Given I open showroom page
    When I filter using the popular filter <popularFilter>
    When I sort using price <order>
    Then I should see a list of cars sorted in the <order>
    Examples:
      | popularFilter      | order      |
      | Best deals         | price-desc |
      | Configure yourself | price-asc  |

#there is a bug in the website when we load the next page after sorting hence some of the following scenarios will fail
  Scenario Outline: As a user, If I do sorting by price ascending/descending I should see that the cars are listed accordingly
    Given I open showroom page
    When I filter using the popular filter <popularFilter>
    When I sort using price <order>
    Then I should see a list of cars sorted in the <order>
    When I load the next page
    Then I should see a list of cars sorted in the <order>
    Examples:
      | popularFilter                 | order      |
      | Best deals                    | price-asc  |
      | Configure yourself            | price-desc |
      | Best deals,Configure yourself | price-desc |
      | Best deals,Configure yourself | price-asc  |
